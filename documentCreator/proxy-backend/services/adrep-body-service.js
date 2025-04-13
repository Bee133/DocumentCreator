const AdrepBodyModel = require('../models/adrep-body-model');

class AdrepBodyService {
    /** получить все записи из таблицы "adrepbodies" по  adrepHeaderId */
    async getAllHeadersRecords(headerId) {
        const list = await AdrepBodyModel.findAll({ where: { adrepHeaderId: headerId } });
        return list;
    }

    /** создать запись в таблице "adrepbodies" */
    async createRecord(payload) {
        const data = await AdrepBodyModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "adrepbodies" */
    async updateRecord(payload) {
        let record = await AdrepBodyModel.findOne({ where: { id: payload.id } });
        record.numberB = payload?.numberB || record.numberB;
        record.dateOfDocB = payload?.dateOfDocB || record.dateOfDocB;
        record.numOfDocB = payload?.numOfDocB || record.numOfDocB;
        record.nameOfDocB = payload?.nameOfDocB || record.nameOfDocB;
        record.rubKopByRepB = payload?.rubKopByRepB || record.rubKopByRepB;
        record.inCurByRepB = payload?.inCurByRepB || record.inCurByRepB;
        record.rubKopByAccountB = payload?.rubKopByAccountB || record.rubKopByAccountB;
        record.inCurByAccountB = payload?.inCurByAccountB || record.inCurByAccountB;
        record.debetScore = payload?.debetScore || record.debetScore;
        record.adrepHeaderId = payload?.adrepHeaderId || record.adrepHeaderId;
        return await record.save();
    }

    /** удалить запись из таблицы "adrepbodies" */
    async removeRecord(recordId) {
        const record = await AdrepBodyModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new AdrepBodyService();