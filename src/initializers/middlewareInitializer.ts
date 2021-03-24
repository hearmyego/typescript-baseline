import express, { Application } from 'express';
import BaseInitializer from './baseInitializer';

import requireHTTPS from '../middleware/requireHTTPS';
import path from 'path';
import appRoot from 'app-root-path';

export class middlewareInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		console.log('middlewareInitializer');
		this.app.use(express.static(path.join(appRoot.path, 'public')));
		this.app.use(requireHTTPS);
	}
}
