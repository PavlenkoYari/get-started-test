/**
 * external libs
 */
const logger = require('log4js').getLogger('ServiceHttpHandler');
/**
 * internal services
 */
const UserService = require('../../services/user.service');

class UserHttpHandler {
    /**
     * list users
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async list(req, res, next) {
        logger.debug(req.id, 'list - processing');

        try {
            const {limit = 10, offset = 0, filters = {}} = req.query;
            const query = {
                email: filters.email || '',
            };

            const data = await UserService.list(query, limit, offset);
            data.items = data.items.map(user => user.toResponse());

            res.send({
                status: true,
                data,
            });

            logger.debug(req.id, 'list - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'list - has been processed with fail status');
            logger.error(req.id, 'list - error message:', e.toString());
            return next(e);
        }
    }

    /**
     * create an user
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async create(req, res, next) {
        logger.debug(req.id, 'create - processing');

        try {
            const {email, password} = req.body;

            res.send({
                status: true,
                data: (
                    await UserService.create({
                        password,
                        email,
                    })
                ).toResponse(),
            });

            logger.debug(req.id, 'create - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'create - has been processed with fail status');
            logger.error(req.id, 'create - error message:', e.toString());
            return next(e);
        }
    }

    /**
     * get an user
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
        logger.debug(req.id, 'Get - processing');

        try {
            res.send({
                status: true,
                data: (await UserService.get(req.params.id)).toResponse(),
            });

            logger.debug(req.id, 'Get - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'Get - has been processed with fail status');
            logger.error(req.id, 'Get - error message:', e.toString());
            return next(e);
        }
    }


    /**
     * delete an user
     *
     * @param {Function} req - express request instance
     *   @see https://expressjs.com/en/4x/api.html#req
     * @param {Function} res - express response instance
     *   @see https://expressjs.com/en/4x/api.html#res
     * @param {Function} next - express middleware handler
     *   @see https://expressjs.com/en/4x/api.html#router
     * @return {Promise<void>}
     */
    static async delete(req, res, next) {
        logger.debug(req.id, 'delete - processing');

        try {
            const userId = req.params.id;
            await UserService.delete(userId);

            res.send({
                status: true,
                data: {},
            });

            logger.debug(req.id, 'delete - has been processed with success status');
            return void 0;
        } catch (e) {
            logger.debug(req.id, 'delete - has been processed with fail status');
            logger.error(req.id, 'delete - error message:', e.toString());
            return next(e);
        }
    }
}

module.exports = UserHttpHandler;
