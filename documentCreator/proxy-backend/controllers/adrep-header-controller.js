const AdrepHeaderService = require('../services/adrep-header-service');

class AdrepHeaderController {
    async getAllRecords(req, res) {
        try {
            const list = await AdrepHeaderService.getAllRecords();
            return res
                .status(200)
                .json(list);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async getOneRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await AdrepHeaderService.getOneRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async createRecord(req, res) {
        try {
            const record = await AdrepHeaderService.createRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)    
                .json(e);
        }
    }

    async updateRecord(req, res) {
        try {
            const record = await AdrepHeaderService.updateRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async removeRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await AdrepHeaderService.removeRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
}

module.exports = new AdrepHeaderController()