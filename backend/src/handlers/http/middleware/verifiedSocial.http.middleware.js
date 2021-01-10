const config = require('jsconfig');

module.exports = async (req, res, next) => {
    const {social} = req.params;
    const {token} = req.body;

    try {
        switch (social) {
            case 'google':
                const {OAuth2Client} = require('google-auth-library');
                const client = new OAuth2Client(config.env.googleAuthClientID);

                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: config.env.googleAuthClientID,
                });

                req.social = ticket.getPayload();

                break;
            default:
                throw new Error(`Invalid social: ${social}`);
        }
    } catch (e) {
        next(e);
    }

    next();
};
