/* @flow */

// eslint-disable-next-line no-process-env
const optionalEnvVariable = (variableName: string) => process.env[variableName];
const requiredEnvVariable = (variableName: string) => {
  const variable = optionalEnvVariable(variableName);

  if (!variable) {
    throw new Error(`${variableName} environment variable is required`);
  }

  return variable;
};

const env = {
  getTmdbApiKey: () => requiredEnvVariable('TMDB_API_KEY'),
  getImdbUserId: () => requiredEnvVariable('IMDB_USER_ID'),
  getTraktApiKey: () => requiredEnvVariable('TRAKT_API_KEY'),
};

export default env;
