const DeviceModel = require('../model/deviceModel');
const BaseRepository = require('./baseRepository');

module.exports = class LoggedInDeviceRepository extends BaseRepository {
    constructor() {
        super();
    }

    model() {
        return DeviceModel;
    }

}