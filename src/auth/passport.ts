import passport from 'passport';

import LocalStrategy from 'passport-local';

import { IUser } from '../core/IUser';
import userModel from '../database/userModel';

import { generateHash, validPassword } from './crypto';

// load the auth variables
// import configAuth from './config'; // use this one for testing

declare global {
	namespace Express {
		interface User extends IUser {}
	}
}

export default function passportConfig(passport: passport.Authenticator) {
	passport.serializeUser(function (user: any, done) {
		console.log('serializeUser');

		//@ts-ignore
		done(null, user._id);
	});

	passport.deserializeUser(async function (id, done) {
		console.log('deserializeUser');

		try {
			const user = (await userModel.findById(id).lean()) as Express.User;
			// user.localSettings = user.local;
			// delete user.local;
			// console.log(user);

			done(null, user);
		} catch (error) {
			done(error, null);
		}
	});

	// LOCAL LOGIN =============================================================
	passport.use(
		'local-login',
		new LocalStrategy.Strategy(
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
		)
	);

	// LOCAL SIGNUP ============================================================
	passport.use(
		'local-signup',
		new LocalStrategy.Strategy(
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
					console.log('User already exist');
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
		)
	);
}
