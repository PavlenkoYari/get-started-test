module.exports = field => (req, res, next) =>
    ((field in req.body === false || req.body[field].length === 0) &&
        next(new Error(`The ${field} field is required`))) ||
    next();
