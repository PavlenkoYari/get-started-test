/**
 * external libs
 */
const jwt = require('jsonwebtoken');
const config = require('jsconfig');
const logger = require('log4js').getLogger('Middleware');

/**
 * internal models
 */
const UserModel = require('../../../db/models/user.model');

/**
 * check a bearer token
 * extend the request object with an user model
 *
 * @param {Function} req - express request instance
 *   @see https://expressjs.com/en/4x/api.html#req
 * @param {Function} res - express response instance
 *   @see https://expressjs.com/en/4x/api.html#res
 * @param {Function} next - express middleware handler
 *   @see https://expressjs.com/en/4x/api.html#router
 * @return {Promise<void>}
 */
module.exports = async (req, res, next) => {
    logger.debug(req.id, 'authHttpMiddleware - processing');

    const unAuthorizeError = new Error('Token is not valid');

    try {
        let token = req.headers.authorization;

        if(token === undefined) {
            throw unAuthorizeError;
        }

        if(token.startsWith('Bearer ')) {
            token = token.slice(7);
        }

        if(token.length === 0) {
            throw unAuthorizeError;
        }

        const decoded = jwt.verify(token, config.env.appKey);
        req.user = await UserModel.findOne({email: decoded.email});

        console.log(req.user)

        next();

        logger.debug(req.id, 'authHttpMiddleware - has been processed with success status');
        return void 0;
    } catch (e) {
        logger.debug(req.id, 'authHttpMiddleware - has been processed with fail status');
        logger.error(req.id, 'authHttpMiddleware - error message:', e.toString());
        return next(unAuthorizeError);
    }
};
