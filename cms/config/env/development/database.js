module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: "localhost",
        database: env("DB_NAME", "scansurv-cms-dev"),
        username: env("DB_USER", "postgres"),
        password: env("DB_PASS", ""),
      },
      options: {},
    },
  },
});
