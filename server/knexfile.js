const credentials = require('./config/dbcredentials');
const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: credentials.development.host,
      database: credentials.development.database,
      user: credentials.development.user,
      password: credentials.development.password
    }
  },
  ...knexSnakeCaseMapper()
};