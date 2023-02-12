const HttpError = require('standard-http-error');
const HashControlFactory = require('../hashControl/hashControlFactory');
const UserRepository = require('../repository/userRepository');
const BaseUsecase = require('./baseUsecase');

module.exports = class UpdateUserUsecase extends BaseUsecase {
    constructor(request, response, hashControl, userRepository) {
        super(request, response);
        this.hashControl = hashControl;
        this.userRepository = userRepository;
    }

    async execute() {
        try {
            const { body } = this.request;
            const { _id: userId } = await this.authenticate() || {};
            const user = await this.userRepository.findOneBySelectingPassword({ _id: userId });
            Object.keys(body).forEach(async (userProp) => {
                if(userProp === 'password') {
                    if(body.oldPassword === undefined) {
                        throw new HttpError(400, 'old password can not be empty');
                    }
                    const isPasswordMatched = await this.hashControl.compare(body.oldPassword, user.password);
                    if(!isPasswordMatched) {
                        throw new HttpError(401, 'Invalid old password');
                    }
                    user.password = await this.hashControl.hash(body.password);
                } else if(userProp != 'oldPassword') {
                    user[userProp] = body[userProp];
                }
            });
            await user.save();
            return user;
        } catch(error) {
            throw error;
        }
    }

    static create(request, response) {
        const usecase = new UpdateUserUsecase(request, response, new HashControlFactory(), new UserRepository());
        return usecase;
    }

}