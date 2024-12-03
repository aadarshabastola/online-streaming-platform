require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: (() => {
      const config = {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || "streaming_platform",
        user: process.env.DB_USER,
      };

      if (process.env.DB_PASSWORD) {
        config.password = String(process.env.DB_PASSWORD);
      }

      console.log("DB Config:", JSON.stringify(config, null, 2));
      return config;
    })(),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: (() => {
      const config = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        ssl: { rejectUnauthorized: false },
      };

      if (process.env.DB_PASSWORD) {
        config.password = String(process.env.DB_PASSWORD);
      }

      console.log("Production DB Config:", JSON.stringify(config, null, 2));
      return config;
    })(),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
