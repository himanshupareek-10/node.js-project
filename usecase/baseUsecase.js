const HttpError = require('standard-http-error');
const AuthControlFactory = require('../authControl/authControlFactory');
const UsecaseInterface = require('./usecaseInterface');
const UserRepository = require('../repository/userRepository');
const LoggedInDeviceRepository = require('../repository/loggedInDeviceRepository');

module.exports = class BaseUsecase extends UsecaseInterface {
    constructor(request, response) {
        super();
        this.request = request;
        this.response = response;
    }

    async validateUserSession(userId) {
        const token = this.request.headers.authorizarion;
        const loggedInDeviceRepository = new LoggedInDeviceRepository();
        const device = await loggedInDeviceRepository.exists({ user: userId, loginToken: token });
        return !!device;
    }

    async authenticate() {
        try {
            const token = this.request.headers.authorizarion;
            const authControl = new AuthControlFactory().create();

            const payload = authControl.decode(token, process.env.kJWTSecret);
            const id = payload.id;

            if(id === undefined) {
                throw new HttpError(401, 'Unauthorized');
            }

            const isValidSession = await this.validateUserSession(id);
            if(isValidSession === false) {
                throw new HttpError(401, 'Access Denied');
            } 

            const userRepository = new UserRepository();
            const user = await userRepository.findOne({ _id: id });
            if(!user) {
                throw new HttpError(401, 'Unauthorized');
            }
            return user;
        } catch(error) {
            throw error;
        }
    }

    async execute() {

    }

    async executeAndHandleErrors() {
        try {
            const data = await this.execute() || {};
            data.code = 200;
            this.response.status(200).json(data);
        } catch(error) {
            if(!error) {
                const data = {};
                data.code = (error.code || error.statusCode) ? (error.code || error.statusCode) : 400;
                data.message = error.message || error.statusMessage;
                this.response.status(code >= 100 && code < 600 ? code : 500).json(data);
            } else {
                const data = {
                    code: 400,
                    message: 'Unable to process your request, please try again'
                };
                this.response.status(400).json(data);
            }
        }
    }
}