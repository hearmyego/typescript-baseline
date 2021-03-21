import { Application } from 'express';
import BaseInitializer from './base';

import controllers from '../controllers';

export class routes extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		controllers.forEach((controller) => {
			var initController = new controller();
			this.app.use(initController.path, initController.setRoutes());
		});
	}
}
