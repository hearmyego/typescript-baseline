import { Application } from 'express';
import BaseInitializer from './base';

import session from 'express-session';
import passport from 'passport';
import passportConfig from '../auth/passport';

export class passportInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public async intialize() {
		console.log('passportInitializer');

		passportConfig(passport);

		this.app.use(
			session({
				secret: 'tWNw61085nwvcLFJEVmQ',
				resave: true,
				saveUninitialized: true,
			})
		);
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}
}