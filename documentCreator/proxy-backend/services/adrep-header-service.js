const AdrepHeaderModel = require('../models/adrep-header-model');

class AdrepHeaderService {
    /** получить все записи из таблицы "adrepheaders" */
    async getAllRecords() {
        const list = await AdrepHeaderModel.findAll();
        return list;
    }

    /** получить одну запись по id из таблицы "adrepheaders" */
    async getOneRecord(recordId) {
        const record = await AdrepHeaderModel.findOne({ where: {id: recordId } });
        return record;
    }

    /** создать запись в таблице "adrepheaders" */
    async createRecord(payload) {
        const data = await AdrepHeaderModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "adrepheaders" */
    async updateRecord(payload) {
        let record = await AdrepHeaderModel.findOne({ where: { id: payload.id } });
        record.nameOfOrgInd = payload?.nameOfOrgInd || record?.nameOfOrgInd;
        record.byOKPO = payload?.byOKPO || record?.byOKPO;
        record.rubTR = payload?.rubTR || record?.rubTR;
        record.kopTR = payload?.kopTR || record?.kopTR;
        record.adrepNum1 = payload?.adrepNum1 || record?.adrepNum1;
        record.adrepDate = payload?.adrepDate || record?.adrepDate;
        record.postBossIndId = payload?.postBossIndId || record?.postBossIndId;
        record.dateTR = payload?.dateTR || record?.dateTR;
        record.structDivision = payload?.structDivision || record?.structDivision;
        record.codeCD = payload?.codeCD || record?.codeCD;
        record.accountablePerson = payload?.accountablePerson || record?.accountablePerson;
        record.serviceNumber = payload?.serviceNumber || record?.serviceNumber;
        record.postIndId = payload?.postIndId || record?.postIndId;
        record.getAd = payload?.getAd || record?.getAd;
        record.previousAdBalance = payload?.previousAdBalance || record?.previousAdBalance;
        record.previousAdOverspending = payload?.previousAdOverspending || record?.previousAdOverspending;
        record.adFirstBoxOffice = payload?.adFirstBoxOffice || record?.adFirstBoxOffice;
        record.inCurrency = payload?.inCurrency || record?.inCurrency;
        record.totalReceived = payload?.totalReceived || record?.totalReceived;
        record.usepUP = payload?.usepUP || record?.usepUP;
        record.remains = payload?.remains || record?.remains;
        record.costOverruns = payload?.costOverruns || record?.costOverruns;
        record.dS1 = payload?.dS1 || record?.dS1;
        record.dSu1 = payload?.dSu1 || record?.dSu1;
        record.crS1 = payload?.crS1 || record?.crS1;
        record.crSu1 = payload?.crSu1 || record?.crSu1;
        record.dS2 = payload?.dS2 || record?.dS2;
        record.dSu2 = payload?.dSu2 || record?.dSu2;
        record.crS2 = payload?.crS2 || record?.crS2;
        record.crSu2 = payload?.crSu2 || record?.crSu2;
        record.application = payload?.application || record?.application;
        record.documentsOn = payload?.documentsOn || record?.documentsOn;
        record.rub2 = payload?.rub2 || record?.rub2;
        record.kop2 = payload?.kop2 || record?.kop2;
        record.orderNum = payload?.orderNum || record?.orderNum;
        record.dateUndNum = payload?.dateUndNum || record?.dateUndNum;
        record.dateUnddateUnd = payload?.dateUnddateUnd || record?.dateUnddateUnd;
        record.accepForVer = payload?.accepForVer || record?.accepForVer;
        record.adrepNum = payload?.adrepNum || record?.adrepNum;
        record.dateUndAdrepNum = payload?.dateUndAdrepNum || record?.dateUndAdrepNum;
        record.countOfDoc = payload?.countOfDoc || record?.countOfDoc;
        record.onSheets = payload?.onSheets || record?.onSheets;
        record.dateLast = payload?.dateLast || record?.dateLast;
        return await record.save();
    }

    /** удалить запись из таблицы "adrepheaders" */
    async removeRecord(recordId) {
        const record = await AdrepHeaderModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new AdrepHeaderService();