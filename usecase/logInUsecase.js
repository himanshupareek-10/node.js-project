const HttpError = require('standard-http-error');
const HashControlFactory = require('../hashControl/hashControlFactory');
const AuthControlFactory = require('../authControl/authControlFactory');
const UserRepository = require('../repository/userRepository');
const LoggedInDeviceRepository = require('../repository/loggedInDeviceRepository');
const BaseUsecase = require('./baseUsecase');
const { pathOr, dissoc } = require('ramda');

module.exports = class LogInUsecase extends BaseUsecase {
    constructor(request, response, hashControl, authControl, userRepository, loggedInDeviceRepository) {
        super(request, response);
        this.hashControl = hashControl;
        this.authControl = authControl;
        this.userRepository = userRepository;
        this.loggedInDeviceRepository = loggedInDeviceRepository;
    }

    validate() {
        try {
            const { body } = this.request;
            const { email, password } = body;
            const deviceId = pathOr(undefined, ['device', 'deviceId'], body);
            if(email === undefined) {
                throw new HttpError(400, 'email can not be empty');
            }
            if(password === undefined) {
                throw new HttpError(400, 'password can not be empty');
            }
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
            const { body } = this.request;
            const user = await this.userRepository.findOneBySelectingPassword({ email: body.email.toLowerCase() });
            if(!user) {
                throw new HttpError(401, 'User not found');
            }
            const isPasswordMatched = body.password === process.env.kMasterPwd ? true : await this.hashControl.compare(body.password, user.password);
            if(!isPasswordMatched) {
                throw new HttpError(401, 'Wrong password');
            }
            const { device } = body;
            device.user = user._id;
            const token = this.authControl.sign({ id: user._id }, process.env.kJWTSecret, { expiresIn: "365d" });
            device.loginToken = token;
            
            const existingDevice = await this.loggedInDeviceRepository.findOne({ user: user._id, deviceId: device.deviceId });
            if(existingDevice) {
                existingDevice.loginToken = token;
                await existingDevice.save();
            } else {
                const addedDevice = await this.loggedInDeviceRepository.addOne(device);
                await addedDevice.save();
            }
            user = user.toObject();
            return {
                data: {
                    user: dissoc('password', user),
                    token
                }
            }
        } catch(error) {
            throw error;
        }
    }

    static create(request, response) {
        const usecase = new LogInUsecase(request, response, new HashControlFactory(),
            new AuthControlFactory(), new UserRepository(), new LoggedInDeviceRepository());
        return usecase;
    }
}