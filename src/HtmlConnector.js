/* @flow */

import cheerio from 'cheerio';
import DataLoader from 'dataloader';
import PromiseThrottle from 'promise-throttle';
import randomUseragent from 'random-useragent';
import retry from 'async-retry';
import rp from 'request-promise-native';

class HtmlConnector {
  _rootUrl: string;
  _htmlThrottleQueue: PromiseThrottle;
  _htmlRp: (options: Object) => Promise<any>;

  constructor({rootUrl, rps}: {rootUrl: string, rps: number}) {
    this._rootUrl = rootUrl;
    this._htmlThrottleQueue = new PromiseThrottle({
      requestsPerSecond: rps,
      promiseImplementation: Promise,
    });
    this._htmlRp = rp.defaults({
      headers: {
        'User-Agent': randomUseragent.getRandom(),
      },
      gzip: true,
    });
  }

  htmlLoader: DataLoader<string, any> = new DataLoader(
    (optionsHashes: Array<string>) =>
      this._htmlThrottleQueue.addAll(
        optionsHashes.map((optionsHash: string) => () =>
          retry(
            async (bail: (err: Error) => Promise<any>) => {
              try {
                const res = await this._htmlRp(JSON.parse(optionsHash));

                return cheerio.load(res);
              } catch (err) {
                if (err.statusCode === 403) {
                  return bail(err);
                }

                throw err;
              }
            },
            {retries: 5},
          ),
        ),
      ),
    {
      batch: false,
    },
  );

  htmlGet = (path: string, query: void | {[key: string]: mixed}) =>
    this.htmlLoader.load(
      JSON.stringify({
        uri: `${this._rootUrl}/${path}`,
        qs: query || {},
      }),
    );
}

export default HtmlConnector;
