/**
 * external libs
 */
const jwt = require('jsonwebtoken');
const config = require('jsconfig');
const logger = require('log4js').getLogger('AuthHttpHandler');

/**
 * internal services
 */
const UserService = require('../../services/user.service');
/**
 * internal utils
 */
const {validateEmail, validatePassword} = require('../../utils');

class AuthHttpHandler {

    /**
     * auth handler
     *
     * @param {Express.Request} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Express.Response} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async social(req, res, next) {
        const self = AuthHttpHandler;
        logger.debug(req.id, 'auth social - processing');

        try {
            const {email, given_name, family_name} = req.social;

            let userModel = await UserService.get(email, 'email');
            logger.trace(req.id, 'auth social - user model:', userModel);

            if(userModel === null) {
                userModel = await UserService.create({
                    email,
                    last_name: family_name,
                    first_name: given_name,
                })
            }

            res.send({
                status: true,
                data: self.generateData({
                    email,
                    last_name: userModel.last_name,
                    first_name: userModel.first_name,
                }),
            });

            logger.debug(req.id, 'auth social - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'auth social - has been processed with fail status');
            logger.error(req.id, 'auth social - error message:', e.toString());
            return next(e);
        }
    }

    /**
     * login handler
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async login(req, res, next) {
        const self = AuthHttpHandler;
        logger.debug(req.id, 'login - processing');

        try {
            const {email, password} = req.body;

            if(!validateEmail(email)) {
                throw new Error('Email is incorrect.');
            }

            if(!validatePassword(password)) {
                throw new Error('Password cannot be shorter than 6 characters, and longer than 50');
            }

            const userModel = await UserService.get(email, 'email');
            logger.trace(req.id, 'login - user model:', userModel);

            if(userModel === null || !(await userModel.validPassword(password))) {
                throw new Error('Email or password is incorrect.');
            }

            res.send({
                status: true,
                data: self.generateData({
                    email,
                }),
            });

            logger.debug(req.id, 'login - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'login - has been processed with fail status');
            logger.error(req.id, 'login - error message:', e.toString());
            return next(e);
        }
    }

    /**
     * registration handler
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async registration(req, res, next) {
        const self = AuthHttpHandler;
        logger.debug(req.id, 'registration - processing');

        try {
            const {email, password} = req.body;

            if(!validateEmail(email)) {
                throw new Error('Email is incorrect.');
            }

            if(!validatePassword(password)) {
                throw new Error('Password cannot be shorter than 6 characters, and longer than 50');
            }

            const userModel = await UserService.get(email, 'email');
            logger.trace(req.id, 'registration - user model:', userModel);

            if(userModel) {
                throw new Error('User with this email already exists');
            }

            await UserService.create({email, password});

            res.send({
                status: true,
                data: self.generateData({email}),
            });

            logger.debug(req.id, 'registration - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'login - has been processed with fail status');
            logger.error(req.id, 'login - error message:', e.toString());
            return next(e);
        }
    }

    /**
     * refresh token handler
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async refresh(req, res, next) {
        const self = AuthHttpHandler;
        logger.debug(req.id, 'refresh - processing');

        try {
            const {refresh_token} = req.body;

            const {email} = jwt.verify(refresh_token, config.env.appKey);
            const userModel = await UserService.get(email, 'email');

            if(Boolean(userModel) === false) {
                throw new Error('unknown_user');
            }

            res.send({
                status: true,
                data: self.generateData({
                    email,
                }),
            });

            logger.debug(req.id, 'refresh - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'refresh - has been processed with fail status');
            logger.error(req.id, 'refresh - error message:', e.toString());
            return next(e);
        }
    }


    /**
     * generate auth response data
     *
     * @param {Object} payload
     * @returns {{access_token: String, refresh_token: String}}
     */
    static generateData(payload) {
        return {
            token_type: 'bearer',
            access_token: this.generateToken(config.env.lifetimeAuthToken, payload),
            refresh_token: this.generateToken(config.env.lifetimeResetToken, payload),
        };
    }

    /**
     * generate auth token
     *
     * @param {Number|String} expiresIn
     * @param {Object} payload
     * @returns {String}
     */
    static generateToken(expiresIn = '1h', payload = {}) {
        return jwt.sign(payload, config.env.appKey, {
            algorithm: config.env.jwtAlgorithm,
            expiresIn,
        });
    }
}

module.exports = AuthHttpHandler;
