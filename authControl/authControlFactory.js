const JwtAuthControl = require('./jwtAuthControl');

module.exports = class AuthControlFactory {
    create() {
        const authControl = new JwtAuthControl();
        return authControl;
    }
}