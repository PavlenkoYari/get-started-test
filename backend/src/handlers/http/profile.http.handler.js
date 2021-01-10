/**
 * external libs
 */
const logger = require('log4js').getLogger('ProfileHttpHandler');
/**
 * internal services
 */
const UserService = require('../../services/user.service');

class ProfileHttpHandler {
    /**
     * get user profile
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async get(req, res, next) {
        logger.debug(req.id, 'get - processing');

        try {
            res.send({
                status: true,
                data: (await UserService.get(req.user._id)).toResponse(),
            });

            logger.debug(req.id, 'get - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'get - has been processed with fail status');
            logger.error(req.id, 'get - error message:', e.toString());
            return next(e);
        }
    }

    /**
     * update user profile
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async update(req, res, next) {
        logger.debug(req.id, 'update - processing');

        try {
            const {last_name, first_name, age} = req.body;

            res.send({
                status: true,
                data: (
                    await UserService.update(req.user._id, {last_name, first_name, age})
                ).toResponse(),
            });

            logger.debug(req.id, 'update - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'update - has been processed with fail status');
            logger.error(req.id, 'update - error message:', e.toString());
            return next(e);
        }
    }
}

module.exports = ProfileHttpHandler;
