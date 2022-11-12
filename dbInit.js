const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './data/database.sqlite',
});

const Quotes = require('./models/Quotes.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    await Quotes.sync();

    console.log('Database synced');

    sequelize.close();
}).catch(console.error);
