module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: `/cloudsql/${env("INSTANCE_CONNECTION_NAME")}`,
        database: env("DB_NAME"),
        username: env("DB_USER"),
        password: env("DB_PASS"),
      },
      options: {},
    },
  },
});
