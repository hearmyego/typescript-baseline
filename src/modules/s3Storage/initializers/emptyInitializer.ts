import { Application } from 'express';
import BaseInitializer from '../../../initializers/baseInitializer';

export class emptyInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		this.logger.info('emptyInitializer');

		// Setting up stuff
	}
}
