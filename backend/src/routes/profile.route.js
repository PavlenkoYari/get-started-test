const router = require('express').Router();
/**
 * internal http handlers
 */
const ProfileHttpHandler = require('../handlers/http/profile.http.handler');

router.get('/', ProfileHttpHandler.get);

router.post(
    '/',
    ProfileHttpHandler.update,
);

module.exports = router;
