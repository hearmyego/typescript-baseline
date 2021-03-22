import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from '../../database/userModel';
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
					console.log('User not found');
					return done(null, false, { message: 'User Not Found' });
				}

				if (!validPassword(password, user.local?.password)) {
					console.log('Password invalid');
					return done(null, false, { message: 'Password not valid' });
				} else {
					console.log('Found and returned');
					return done(null, user);
				}
			} catch (error) {
				console.error(error);
			}
		}
	);
}
