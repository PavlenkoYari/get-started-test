const router = require('express').Router();
/**
 * internal http handlers
 */
const AuthHttpHandler = require('../handlers/http/auth.http.handler');

/**
 * http middleware
 */
const RequiredHttpMiddleware = require('../handlers/http/middleware/required.http.middleware');
const VerifiedSocialHttpMiddleware = require('../handlers/http/middleware/verifiedSocial.http.middleware');

router.post('/login', RequiredHttpMiddleware('email'), RequiredHttpMiddleware('password'), AuthHttpHandler.login);
router.post('/registration', RequiredHttpMiddleware('email'), RequiredHttpMiddleware('password'), AuthHttpHandler.registration);
router.post('/social/:social', VerifiedSocialHttpMiddleware, AuthHttpHandler.social);
router.post('/token/refresh', RequiredHttpMiddleware('refresh_token'), AuthHttpHandler.refresh);

module.exports = router;
