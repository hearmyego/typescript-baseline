import { Application } from 'express';
import BaseInitializer from './baseInitializer';

import mongoose from 'mongoose';
import databaseConfig from '../database/databaseConfig';

export class databaseInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize() {
		mongoose
			.connect(databaseConfig.url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			})
			.then(() => this.logger.info('Database connected'))
			.catch((err) => this.logger.error(err));
	}
}
