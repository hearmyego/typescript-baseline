import { Application } from 'express';
import BaseInitializer from './base';

import controllers from '../controllers';

export class routesInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		console.log('routesInitializer');
		controllers.forEach((controller) => {
			var initController = new controller();
			this.app.use(initController.path, initController.setRoutes());
		});
	}
}
