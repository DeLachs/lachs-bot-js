module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quotes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        guild_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quoted_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unix_timestamp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });
};
