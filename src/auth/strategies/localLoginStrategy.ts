import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from '../../database/userModel';
import logger from '../../global/logger';
import { validPassword } from '../crypto';

export function localLoginStrategy(): passport.Strategy {
	return new LocalStrategy.Strategy(
		{
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
		},
		async function (req, email, password, done) {
			try {
				var user = await userModel.findOne({ 'local.email': email }).lean();

				if (!user) {
					logger.info('User not found');
					return done(null, false, { message: 'User Not Found' });
				}

				if (!validPassword(password, user.local?.password)) {
					logger.info('Password invalid');
					return done(null, false, { message: 'Password not valid' });
				} else {
					logger.info('Found and returned');
					return done(null, user);
				}
			} catch (error) {
				logger.error(error);
			}
		}
	);
}
