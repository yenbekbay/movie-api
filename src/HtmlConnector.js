/* @flow */

import cheerio from 'cheerio';
import DataLoader from 'dataloader';
import PromiseThrottle from 'promise-throttle';
import randomUseragent from 'random-useragent';
import rp from 'request-promise-native';

class HtmlConnector {
  _rootUrl: string;
  _htmlThrottleQueue: PromiseThrottle;
  _htmlRp: (options: Object) => Promise<any>;

  constructor({ rootUrl, rps }: {
    rootUrl: string,
    rps: number,
  }) {
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

  htmlLoader: { load: (url: string) => Promise<any> } = new DataLoader(
    (opts: Array<string>) => this._htmlThrottleQueue.addAll(
      opts.map((options: string) => async () => {
        const res = await this._htmlRp(JSON.parse(options));

        return cheerio.load(res);
      }),
    ), {
      batch: false,
    },
  );

  htmlGet = (
    path: string,
    query: void | { [key: string]: mixed },
  ) => this.htmlLoader.load(
    JSON.stringify({
      uri: `${this._rootUrl}/${path}`,
      qs: query || {},
    }),
  );
}

export default HtmlConnector;
