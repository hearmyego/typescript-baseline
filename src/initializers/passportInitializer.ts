import { Application } from 'express';
import BaseInitializer from './baseInitializer';

import session from 'express-session';
import passport from 'passport';
import passportConfig from '../auth/passport';

export class passportInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public async intialize() {
		this.logger.info('passportInitializer');

		passportConfig(passport);

		// this.app.use(
		// 	session({
		// 		secret: 'tWNw61085nwvcLFJEVmQ',
		// 		resave: true,
		// 		saveUninitialized: true,
		// 	})
		// );
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}
}
