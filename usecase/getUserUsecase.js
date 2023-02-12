const BaseUsecase = require('./baseUsecase');

module.exports = class GetUserUsecase extends BaseUsecase {
    constructor(request, response) {
        super(request, response);
    }

    async execute() {
        try {
            const loggedInUser = await this.authenticate();
            return loggedInUser;
        } catch(error) {
            throw error;
        }
    }

    static create(request, response) {
        const usecase = new GetUserUsecase(request, response);
        return usecase;
    }

}