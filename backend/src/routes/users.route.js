const router = require('express').Router();
/**
 * internal http handlers
 */
const UserHttpHandler = require('../handlers/http/user.http.handler');
/**
 * http models
 */
const UserModel = require('../db/models/user.model');
/**
 * http middleware
 */
const ExistHttpMiddleware = require('../handlers/http/middleware/exist.http.middleware');
const checkIdHttpMiddleware = require('../handlers/http/middleware/check-id.http.middleware');

router.get('/', UserHttpHandler.list);

router.get('/:id', checkIdHttpMiddleware('params.id'), ExistHttpMiddleware(UserModel, '_id', 'params.id', 'Invalid id param'), UserHttpHandler.get);

router.post(
    '/delete/:id',
    checkIdHttpMiddleware('params.id'),
    ExistHttpMiddleware(UserModel, '_id', 'params.id', 'Invalid id param'),
    UserHttpHandler.delete,
);

module.exports = router;
