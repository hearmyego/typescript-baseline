import express, { Application } from 'express';
import BaseInitializer from './base';

import requireHTTPS from '../middleware/requireHTTPS';
import path from 'path';
import appRoot from 'app-root-path';

export class middleware extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		console.log('middleware');
		this.app.use(express.static(path.join(appRoot.path, 'public')));
		this.app.use(requireHTTPS);
	}
}
