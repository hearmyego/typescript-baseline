import { Application } from 'express';
import BaseInitializer from './baseInitializer';

import requireHTTPS from '../middleware/requireHTTPS';

export class middlewareInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		this.logger.info('middlewareInitializer');

		this.app.use(requireHTTPS);
	}
}
