import passport from 'passport';

import { IUser } from '../core/IUser';

import { localSignupStrategy } from './strategies/localSignupStrategy';
import { localLoginStrategy } from './strategies/localLoginStrategy';
import { deserializeUser } from './strategies/deserializeUser';
import { serializeUser } from './strategies/serializeUser';

// load the auth variables
// import configAuth from './config'; // use this one for testing

declare global {
	namespace Express {
		interface User extends IUser {}
	}
}

export default function passportConfig(passport: passport.Authenticator) {
	passport.serializeUser(serializeUser());
	passport.deserializeUser(deserializeUser());

	passport.use('local-login', localLoginStrategy());
	passport.use('local-signup', localSignupStrategy());
}
