const UserRepository = require('../repository/userRepository');
const BaseUsecase = require('./baseUsecase');

module.exports = class DeleteUserUsecase extends BaseUsecase {
    constructor(request, response, userRepository) {
        super(request, response);
        this.userRepository = userRepository;
    }

    async execute() {
        try {
            const loggedInUser = await this.authenticate();
            await this.userRepository.deleteOne({ _id: loggedInUser._id });
            return loggedInUser;
        } catch(error) {
            throw error;
        }
    }

    static create(request, response) {
        const usecase = new DeleteUserUsecase(request, response, new UserRepository());
        return usecase;
    }

}