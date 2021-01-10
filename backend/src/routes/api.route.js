/**
 * external libs
 */
const router = require('express').Router();

/**
 * internal http middleware
 */
const AuthHttpMiddleware = require('../handlers/http/middleware/auth.http.middleware');

router.use('/auth', require('./auth.route'));
router.use('/profile', AuthHttpMiddleware, require('./profile.route'));
router.use('/users', AuthHttpMiddleware, require('./users.route'));

module.exports = router;
