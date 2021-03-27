import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from '../../database/userModel';
import logger from '../../global/logger';
import { generateHash } from '../crypto';

export function localSignupStrategy(): passport.Strategy {
	return new LocalStrategy.Strategy(
		{
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
		},
		async function (req, email, password, done) {
			const existingUser = await userModel
				.findOne({ 'local.email': email })
				.lean();

			if (existingUser) {
				logger.info('User already exist');
				return done(null, false, {
					message: 'That email is already taken.',
				});
			}

			if (req.user) {
				const user = req.user;

				user.local = {
					email: email,
					password: generateHash(password),
				};

				await userModel.create(user, function (err: any) {
					if (err) throw err;
					return done(null, user);
				});
			}

			//  We're not logged in, so we're creating a brand new user.
			else {
				// create the user
				var newUser = new userModel();

				newUser.firstName = req.body.firstname;
				newUser.lastName = req.body.lastname;
				newUser.email = email;
				newUser.local = {
					email: email,
					password: generateHash(password),
				};

				newUser.save(function (err: any) {
					if (err) throw err;

					return done(null, newUser);
				});
			}
		}
	);
}
