const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Quotes = require('./models/Quotes.js')(sequelize, Sequelize.DataTypes);

module.exports = { Quotes };
