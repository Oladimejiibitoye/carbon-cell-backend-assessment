// Constants for default values
const DEFAULT_PORT = 5000;
const DEFAULT_MONGO_URI = "mongodb://localhost:27017/pemvy8n";
const DEFAULT_AUTH_SECRET = "development-secret";
const DEFAULT_BASE_URL = "https://carbon-cell-backend-assessment-245a.onrender.com";
const DEFAULT_ACCESS_TOKEN_SECRET = "Pn@4Ie#1W%Rm9Gk&7Qy2Ov^3U";
const DEFAULT_ACCESS_TOKEN_EXPIRES_IN = "1h";
const DEFAULT_ACCESS_TOKEN_NOT_BEFORE = "0";
const DEFAULT_JWT_ALGORITHM = "HS256";
const DEFAULT_JWT_AUDIENCE = "carboncell.dev";
const DEFAULT_JWT_ISSUER = "carboncell.api";
const DEFAULT_ETHEREUM_NODE_URL = "https://mainnet.infura.io/v3/your_infura_project_id"


class ConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConfigError";
  }
}

const config = (() => {
  let instance;

  return (() => {
    if (instance) {
      return instance;
    }

    instance = {
      envVars: process.env,

      // Initialize environment and configurations
      init: function (env = process.env.NODE_ENV || "development") {
        try {
          console.log(`Loading configuration for ${env} environment.`);
          this.envVars = process.env;
        } catch (error) {
          console.error("Error loading environment variables:", error);
        }
      },

      // Method to get environment variable
      get: function (varName, defaultValue = "") {
        try {
          const value = this.envVars[varName];
          if (!value && !defaultValue) {
            throw new ConfigError(
              `Environment variable ${varName} is not defined.`
            );
          }
          return value || defaultValue;
        } catch (error) {
          console.error(
            `Error getting environment variable ${varName}:`,
            error
          );
          return defaultValue;
        }
      },
      getPort: function () {
        return this.get("PORT", DEFAULT_PORT);
      },
      getMongoUri: function () {
        return this.get("MONGO_URL", DEFAULT_MONGO_URI);
      },
      getAuthSecret: function () {
        return this.get("AUTH_SECRET", DEFAULT_AUTH_SECRET);
      },
      getBaseUrl: function () {
        return this.get("BASE_URL", DEFAULT_BASE_URL);
      },
      getAccessTokenSecret: function () {
        return this.get("ACCESS_TOKEN_SECRET", DEFAULT_ACCESS_TOKEN_SECRET);
      },
      getAccessTokenExpiresIn: function () {
        return this.get(
          "ACCESS_TOKEN_EXPIRES_IN",
          DEFAULT_ACCESS_TOKEN_EXPIRES_IN
        );
      },
      getAccessTokenNotBefore: function () {
        return this.get(
          "ACCESS_TOKEN_NOT_BEFORE",
          DEFAULT_ACCESS_TOKEN_NOT_BEFORE
        );
      },
      getJwtAlgorithm: function () {
        return this.get("JWT_ALGORITHM", DEFAULT_JWT_ALGORITHM);
      },
      getJwtAudience: function () {
        return this.get("JWT_AUDIENCE", DEFAULT_JWT_AUDIENCE);
      },
      getJwtIssuer: function () {
        return this.get("JWT_ISSUER", DEFAULT_JWT_ISSUER);
      },
      getEthereumNodeUrl: function () {
        return this.get("ETHEREUM_NODE_URL", DEFAULT_ETHEREUM_NODE_URL)
      }
    };

    instance.init();
    return instance;
  })();
})();

module.exports = {
  PORT: config.getPort(),
  BASE_URL: config.getBaseUrl(),
  MONGO_URL: config.getMongoUri(),
  AUTH_SECRET: config.getAuthSecret(),
  ACCESS_TOKEN_SECRET: config.getAccessTokenSecret(),
  ACCESS_TOKEN_EXPIRES_IN: config.getAccessTokenExpiresIn(),
  ACCESS_TOKEN_NOT_BEFORE: config.getAccessTokenNotBefore(),
  JWT_ALGORITHM: config.getJwtAlgorithm(),
  JWT_AUDIENCE: config.getJwtAudience(),
  JWT_ISSUER: config.getJwtIssuer(),
  ETHEREUM_NODE_URL: config.getEthereumNodeUrl()
};
