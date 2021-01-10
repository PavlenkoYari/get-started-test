/**
 * external libs
 */
const logger = require('log4js').getLogger('Middleware');
const mongoose = require('mongoose');

module.exports = (path = 'params.id', message = 'invalid_id') => (req, res, next) => {
    logger.debug(req.id, 'checkIdHttpMiddleware - processing');
    logger.trace(req.id, 'checkIdHttpMiddleware - path:', path, 'message:', message);

    try {
        const id = path.split('.').reduce((a, b) => (Boolean(a) && b in a ? a[b] : null), req);
        logger.trace(req.id, 'checkIdHttpMiddleware - id:', String(id));

        if(Boolean(id) === false || mongoose.Types.ObjectId.isValid(String(id)) === false) {
            throw new Error(message);
        }

        logger.debug(req.id, 'checkIdHttpMiddleware - has been processed with success status');
        return next();
    } catch (e) {
        logger.debug(req.id, 'checkIdHttpMiddleware - has been processed with fail status');
        logger.error(req.id, 'checkIdHttpMiddleware - error message:', e.toString());
        return next(new Error(message));
    }
};
