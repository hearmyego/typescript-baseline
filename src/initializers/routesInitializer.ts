import { Application } from 'express';
import BaseInitializer from './baseInitializer';

import controllers from '../controllers';

export class routesInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		this.logger.info('routesInitializer');
		controllers.forEach((controller) => {
			var initController = new controller();
			this.app.use(initController.path, initController.setRoutes());
		});
	}
}
