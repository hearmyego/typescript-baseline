import bunyan from 'bunyan';

const env = process.env.NODE_ENV || 'development';

function getConfig(env: string): bunyan.LoggerOptions {
	switch (env) {
		case 'development':
			return {
				name: env,
				level: 'debug',
			};

		case 'production':
			return {
				name: env,
				level: 'debug',
			};

		default:
			return {
				name: 'development',
				level: 'debug',
			};
	}
}

const logger = bunyan.createLogger(getConfig(env));

export default logger;
