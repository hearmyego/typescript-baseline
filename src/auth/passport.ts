import passport from 'passport';

import { IUser } from '../core/IUser';

import { localSignupStrategy } from './strategies/localSignupStrategy';
import { localLoginStrategy } from './strategies/localLoginStrategy';
import { authZeroStrategy } from './strategies/authZeroStrategy';
import { deserializeUser, serializeUser } from './strategies/userSerialization';

// load the auth variables
// import configAuth from './config'; // use this one for testing

declare global {
	namespace Express {
		interface User extends IUser {}
	}
}

export default function passportConfig(passport: passport.Authenticator) {
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((user, done) => {
		done(null, user as Express.User);
	});

	passport.use('local-login', localLoginStrategy());
	passport.use('local-signup', localSignupStrategy());
	passport.use('authZero', authZeroStrategy());
}
