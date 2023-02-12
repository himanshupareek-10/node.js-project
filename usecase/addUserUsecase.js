const mongoose = require('mongoose');
const HashControlFactory = require('../hashControl/hashControlFactory');
const AuthControlFactory = require('../authControl/authControlFactory');
const UserRepository = require('../repository/userRepository');
const LoggedInDeviceRepository = require('../repository/loggedInDeviceRepository');
const BaseUsecase = require('./baseUsecase');

module.exports = class AddUserUsecase extends BaseUsecase {
    constructor(request, response, hashControl, authControl, userRepository, loggedInDeviceRepository) {
        super(request, response);
        this.hashControl = hashControl;
        this.authControl = authControl;
        this.userRepository = userRepository;
        this.loggedInDeviceRepository = loggedInDeviceRepository;
    }

    async execute() {
        try {
            const session = await mongoose.startSession();
            session.startTransaction({ readPreference: 'primary' });
            const { body } = this.request;
            if(body.password) {
                body.password = await this.hashControl.hash(body.password);
            }
            const user = await this.userRepository.addOne(body);
            await user.save({ session });
            const token = this.authControl.sign({ id: user._id }, process.env.kJWTSecret, { expiresIn: "365d" });
            const device = {
                user: user._id,
                deviceId: body.deviceId,
                loginToken: token
            }
            const addedDevice = await this.loggedInDeviceRepository.addOne(device);
            await addedDevice.save({ session });
            session.commitTransaction();
            return user;
        } catch(error) {
            session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    static create(request, response) {
        const usecase = new AddUserUsecase(request, response, new HashControlFactory(),
            new AuthControlFactory(), new UserRepository(), new LoggedInDeviceRepository());
        return usecase;
    }

}