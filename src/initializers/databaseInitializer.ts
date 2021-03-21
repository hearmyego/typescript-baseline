import { Application } from 'express';
import BaseInitializer from './base';

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
			.then(() => console.log('Database connected'))
			.catch((err) => console.log(err));
	}
}
