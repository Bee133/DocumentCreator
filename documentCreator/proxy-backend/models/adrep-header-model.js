const Sequelize = require('sequelize');
const sequelize = require('../connection');

const AdrepHeaderModel = sequelize.define(
    'adrepheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nameOfOrgInd: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        byOKPO: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rubTR: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        kopTR: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        adrepNum1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        adrepDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        postBossIndId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        dateTR: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        structDivision: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        codeCD: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        accountablePerson: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        serviceNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        postIndId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        getAd: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        previousAdBalance: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        previousAdOverspending: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        adFirstBoxOffice: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        inCurrency: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        underCurrency2: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        totalReceived: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        usepUP: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        remains: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        costOverruns: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        dS1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dSu1: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        crS1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        crSu1: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        dS2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dSu2: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        crS2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        crSu2: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        application: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        documentsOn: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        rub2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        kop2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        orderNum: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dateUndNum: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        dateUnddateUnd: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        accepForVer: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        adrepNum: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dateUndAdrepNum: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        countOfDoc: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        onSheets: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dateLast: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = AdrepHeaderModel;