import passport from 'passport';
import authZero from 'passport-auth0';
import config from './config';

export function authZeroStrategy(): passport.Strategy {
	return new authZero.Strategy(
		{
			domain: config.authZeroAuth.domain,
			clientID: config.authZeroAuth.clientID,
			clientSecret: config.authZeroAuth.clientSecret,
			callbackURL: config.authZeroAuth.callbackUrl,
		},
		function (accessToken, refreshToken, extraParams, profile, done) {
			return done(null, profile);
		}
	);
}
