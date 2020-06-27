import * as jwt from 'jsonwebtoken';
const config = require('../config.json');

function routeGuard(req, res, next) {

    try {
    // Removing the bearer prefix, leaving the clean token
    const token = req.headers.authorization.substring("Bearer ".length);
    const userData = jwt.verify(token, config.secret);
    // if(userData.userType === 'ADMIN') {

    // }

    next();
    } catch {
        return res.status(403).json({
            message: 'Authorization failed'
        });
    }

}

module.exports = routeGuard;