const jwt = require('jsonwebtoken');
const HttpError = require('standard-http-error');
const AuthControlInterface = require('./authControlInterface');

module.exports = class JwtAuthControl extends AuthControlInterface {
    constructor() {
        super();
    }

    sign(valueToEncode, secret, options) {
        try {
            const token = jwt.sign({payload: valueToEncode}, secret, options);
            return token;
        } catch(error) {
            throw new HttpError(500, 'InternalServerError');
        }
    }

    decode(token, secret) {
        try {
            const decoded = jwt.verify(token, secret);
            return decoded.payload;
        } catch (error) {
            throw new HttpError(401, 'Unauthorized');
        }
    }

}