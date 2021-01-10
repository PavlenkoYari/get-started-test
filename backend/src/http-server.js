/**
 * external libs
 */
const logger = require('log4js').getLogger('http-server');
const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');


class HttpServer {
    /**
     * init a http server
     *
     * @param {String} host
     * @param {String|Number} port
     */
    async init(host, port) {
        const self = HttpServer;
        // set the host and port
        self.host = host;
        self.port = port;
        // init a http server
        self.app = express();
        self.app.set('trust proxy', true);
        // add the settings
        this.useCors();
        this.useRequestParsers();
        this.useRequestTrace();
        this.useResponseTrace();
        // add routes
        this.useRoutes();
        // listen to the http host and port
        self.app.listen(port, host, () => logger.debug(`App listening on ${host}:${port}!`));
    }

    /**
     * add cors
     *
     * @return {void}
     */
    useCors() {
        const self = HttpServer;
        self.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.header('Access-Control-Max-Age', 600);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
            res.header('Access-Control-Expose-Headers', 'content-type, authorization, x-request-id');

            switch (req.method) {
                case 'OPTIONS':
                    return res.send({status: true, data: {}});
                case 'GET':
                case 'POST':
                    return next();
                default:
                    return res.status(405).send({status: false, error: 'req_type'});
            }
        });
        return void 0;
    }

    /**
     * parse request
     *
     * @return {void}
     */
    useRequestParsers() {
        const self = HttpServer;
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({extended: false}));
    }

    /**
     * add trace to request
     *
     * @return {void}
     */
    useRequestTrace() {
        const self = HttpServer;
        self.app.use((req, res, next) => {
            const date = new Date();
            req._startTime = date.getTime();
            req.id = uuidv4();
            res.setHeader('X-Request-Id', req.id);
            logger.trace(req.id, 'REQUEST', 'method:', req.method, 'uri:', req.url, 'body:', req.body, 'query:', req.query);
            next();
        });
    }

    /**
     * add trace to response
     *
     * @return {void}
     */
    useResponseTrace() {
        const self = HttpServer;
        self.app.use((req, res, next) => {
            const {json} = res;
            res.json = function (body) {
                logger.trace(req.id, 'RESPONSE', 'body:', body);
                json.apply(res, arguments);
            };
            next();
        });
    }

    /**
     * add http routes
     *
     * @return {void}
     */
    useRoutes() {
        const self = HttpServer;
        // user`s routes
        self.app.use('/api/v1', require('./routes/api.route'));
        // catch 404 and forward
        self.app.use((req, res, next) =>
            res.status(404).json({
                status: false,
                data: {},
            }),
        );
        // error handler
        self.app.use((err, req, res, next) => {
            res.status(err.status || 200).send({
                status: false,
                data: {},
                error: err.message,
            });
        });
    }
}

module.exports = new HttpServer();
