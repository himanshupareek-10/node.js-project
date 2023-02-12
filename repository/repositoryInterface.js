module.exports = class RepositoryInterface {
    constructor() {
        if(this.model === undefined) {
            throw new TypeError('Concrete RepositoryInterface must implement -model');
        }
        if(this.addOne === undefined) {
            throw new TypeError('Concrete RepositoryInterface must implement -addOne');
        }
        if(this.findOne === undefined) {
            throw new TypeError('Concrete RepositoryInterface must implement -findOne');
        }
        if(this.updateOne === undefined) {
            throw new TypeError('Concrete RepositoryInterface must implement -updateOne');
        }
        if(this.deleteOne === undefined) {
            throw new TypeError('Concrete RepositoryInterface must implement -deleteOne');
        }
    }
}