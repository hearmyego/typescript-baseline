import express, { Application } from 'express';
import logger from './global/logger';
import initializers from './initializers';

export default class App {
	public app: Application;
	public port: number;

	constructor(port: number) {
		this.app = express();
		this.port = port;

		initializers.forEach((initializer) => {
			new initializer(this.app);
		});
	}

	public listen() {
		this.app.listen(this.port, () => {
			logger.info(`App listening on the port ${this.port}`);
		});
	}
}
