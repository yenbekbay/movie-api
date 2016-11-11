/* @flow */

const optionalEnvVariable = (variableName: string) => process.env[variableName];
const requiredEnvVariable = (variableName: string) => {
  const variable = optionalEnvVariable(variableName);

  if (!variable) {
    throw new Error(`${variableName} environment variable is required`);
  }

  return variable;
};

export default {
  getTmdbApiKey: () => requiredEnvVariable('TMDB_API_KEY'),
};
