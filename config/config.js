require('dotenv').config(); // caso use .env

module.exports = {
  development: {
    username: 'postgres',
    password: '123456',
    database: 'Big-Chat-DEV',
    host: 'localhost',
    dialect: 'postgres'
  },
};
