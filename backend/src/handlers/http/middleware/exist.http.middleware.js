/**
 * external libs
 */
const logger = require('log4js').getLogger('Middleware');

module.exports = (model = {}, field = '', path = '', message = 'entity_not_exists', isRequired = true) => async (
    req,
    res,
    next,
) => {
    logger.debug(req.id, 'existHttpMiddleware processing');
    logger.trace(
        req.id,
        'existHttpMiddleware model:',
        model.modelName,
        'field:',
        field,
        'path:',
        path,
        'message:',
        message,
    );

    try {
        if(Boolean(model) === false || 'find' in model === false) {
            throw new Error('invalid_model');
        }

        if(Boolean(field) === false) {
            throw new Error('invalid_field');
        }

        const data = path.split('.').reduce((a, b) => (Boolean(a) && b in a ? a[b] : null), req);
        if(Boolean(data) === false && isRequired === false) {
            logger.debug(req.id, 'existHttpMiddleware optional field is missing');
            return next();
        }

        if(Boolean(data) === false) {
            throw new Error('invalid_path');
        }

        if(Boolean(await model.findOne({[field]: data})) === false) {
            throw new Error('invalid_data');
        }

        logger.debug(req.id, 'existHttpMiddleware has been processed with success status');
        return next();
    } catch (e) {
        logger.debug(req.id, 'existHttpMiddleware has been processed with fail status');
        logger.error(req.id, 'existHttpMiddleware error message:', e.toString());
        return next(new Error(message));
    }
};
