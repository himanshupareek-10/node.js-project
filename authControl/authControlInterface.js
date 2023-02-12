module.exports = class AuthControlInterface {
    constructor() {
        if(this.sign === undefined) {
            throw new TypeError('Concrete AuthControlInterface must implement -sign');
        }
        if(this.decode === undefined) {
            throw new TypeError('Concrete AuthControlInterface must implement -decode');
        }
    }
}