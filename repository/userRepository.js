const UserModel = require('../model/userModel');
const BaseRepository = require('./baseRepository');

module.exports = class UserRepository extends BaseRepository {
    constructor() {
        super();
    }

    model() {
        return UserModel;
    }

    async findOneBySelectingPassword(predicate) {
        const model = this.model();
        return model.findOne(predicate).select('+password');
    }
}