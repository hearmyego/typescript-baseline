import Logger from 'bunyan';
import { Application } from 'express';
import { IInitializer } from '../core/IInitializer';
import logger from '../global/logger';

export default abstract class BaseInitializer implements IInitializer {
	public app: Application;
	public logger: Logger;

	constructor(app: Application) {
		this.app = app;
		this.logger = logger;
		this.intialize();
	}

	public intialize(): void {
		this.logger.info('BaseInitializer');
	}
}
