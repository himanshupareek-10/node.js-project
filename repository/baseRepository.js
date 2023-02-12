const RepositoryInterface = require('./repositoryInterface');

module.exports = class BaseRepository extends RepositoryInterface {
    constructor() {
        super();
    }

    async addOne(info) {
        const model = this.model();
        return new model(info);
    }

    async addBatch(info) {
        const model = this.model();
        return model.collection.insertMany(info);
    }

    async findOne(predicate, projection) {
        const model = this.model();
        return model.findOne(predicate, projection);
    }

    async findBatch(predicate, projection) {
        const model = this.model();
        return model.find(predicate, projection);
    }

    async exists(predicate) {
        const model = this.model();
        return model.exists(predicate);
    }

    async updateOne(predicate, info, options) {
        const model = this.model();
        return model.updateOne(predicate, info, options);
    }

    async updateBatch(predicate, projection, options) {
        const model = this.model();
        return model.updateMany(predicate, projection, options);
    }

    async findOneAndUpdate(predicate, projection, options) {
        const model = this.model();
        if(options === undefined) {
            options = { new: true };
        }
        return model.findOneAndUpdate(predicate, projection, options);
    }
    
    async deleteOne(predicate) {
        const model = this.model();
        return model.deleteOne(predicate);
    }

    async deleteBatch(predicate) {
        const model = this.model();
        return model.deleteMany(predicate);
    }
}