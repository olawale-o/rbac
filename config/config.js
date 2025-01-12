module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "rbac_development",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "postgres",
    password: null,
    database: "rbac_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: null,
    database: "rbac_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
