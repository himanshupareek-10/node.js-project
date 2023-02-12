const HttpError = require('standard-http-error');
const LoggedInDeviceRepository = require('../repository/loggedInDeviceRepository');
const BaseUsecase = require('./baseUsecase');

module.exports = class LogOutUsecase extends BaseUsecase {
    constructor(request, response, loggedInDeviceRepository) {
        super(request, response);
        this.loggedInDeviceRepository = loggedInDeviceRepository;
    }

    validate() {
        try {
            const { body } = this.request;
            const { deviceId } = body;
            if(deviceId === undefined) {
                throw new HttpError(400, 'deviceId can not be empty');
            }
        } catch(error) {
            throw error;
        }
    }

    async execute() {
        try {
            this.validate();
            const loggedInUser = await this.authenticate();
            const { body } = this.request;
            const { deviceId } = body;
            await this.loggedInDeviceRepository.deleteOne({ user: loggedInUser._id, deviceId });
        } catch(error) {
            throw error;
        }
    }

    static create(request, response) {
        const usecase = new LogOutUsecase(request, response, new LoggedInDeviceRepository());
        return usecase;
    }
}