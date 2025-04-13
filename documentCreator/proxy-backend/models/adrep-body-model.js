const Sequelize = require('sequelize');
const sequelize = require('../connection');

const AdrepBodyModel = sequelize.define(
    'adrepbody',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        numberB: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dateOfDocB: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        numOfDocB: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nameOfDocB: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        rubKopByRepB: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        inCurByRepB: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        rubKopByAccountB: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        inCurByAccountB: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        debetScore: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        adrepHeaderId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = AdrepBodyModel;