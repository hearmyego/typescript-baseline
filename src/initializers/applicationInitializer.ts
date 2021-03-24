import express, { Application } from 'express';
import BaseInitializer from './baseInitializer';

import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import appRoot from 'app-root-path';
import path from 'path';

export class applicationInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public async intialize() {
		console.log('applicationInitializer');

		this.app.disable('etag');
		this.app.disable('x-powered-by');
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(compression());

		this.app.use(express.static(path.join(appRoot.path, 'public')));
	}
}
