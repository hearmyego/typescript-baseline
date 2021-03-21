import { Application } from 'express';
import BaseInitializer from './base';

import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export class application extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public async intialize() {
		console.log('application');

		this.app.disable('etag');
		this.app.disable('x-powered-by');
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(compression());
	}
}
