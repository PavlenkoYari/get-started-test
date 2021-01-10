/**
 * Module dependencies.
 */
const path = require('path');
const config = require('jsconfig');
const log4js = require('log4js');
const { colouredLayout } = require('log4js/lib/layouts');
const { sanitizeString } = require('../src/utils');

const configPath =
	process.argv.indexOf('--config') !== -1 ? process.argv[process.argv.indexOf('--config') + 1] : './config.js';

module.exports = () =>
	new Promise(resolve => {
		config.load(path.resolve(configPath), async () => {
			const schema = 1;
			// check config version
			if (config.version !== schema) {
				console.error('Unsupported configuration version.', config.version, schema);
				process.exit(-1);
			}
			// logging
			log4js.addLayout('json', conf => logEvent => {
				const { data = [] } = logEvent;
				const { limit = 0 } = conf;
				const tail = limit ? parseInt(limit / 2, 10) : 0;

				const formatter = (name, val) => {
					return typeof val === 'string'
						? sanitizeString(limit && val.length > limit ? `${val.slice(0, tail)}..${val.slice(0 - tail)}` : val)
						: val;
				};

				logEvent.data = [
					data
						.map(item => {
							if (typeof item === 'object') {
								return JSON.stringify(item, formatter);
							}

							if (typeof item === 'string') {
								return sanitizeString(item);
							}

							return '';
						})
						.join(' '),
				];
				return colouredLayout(logEvent);
			});
			log4js.configure(config.log4js);
			// mongo
			const Mongoose = require('mongoose');
			// // wait database connecting
			await Mongoose.connect(config.mongo, {
				useCreateIndex: true,
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
			});

			resolve(config);
		});
	});
