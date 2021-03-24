export default {
	facebookAuth: {
		clientID: 'your-secret-clientID-here', // your App ID
		clientSecret: 'your-client-secret-here', // your App Secret
		callbackURL: 'http://localhost:8080/auth/facebook/callback',
	},

	twitterAuth: {
		consumerKey: 'your-consumer-key-here',
		consumerSecret: 'your-client-secret-here',
		callbackURL: 'http://localhost:8080/auth/twitter/callback',
	},

	googleAuth: {
		clientID: 'your-secret-clientID-here',
		clientSecret: 'your-client-secret-here',
		callbackURL: 'http://localhost:8080/auth/google/callback',
	},
	authZeroAuth: {
		clientID: 'dZTrmywYnRZobOkjueBVOogIYscOIkh2',
		domain: 'hearmyego.eu.auth0.com',
		clientSecret:
			'WWhXUZRcwZhcUYFpViRPfmde-P1cD0_g0V9rukSTV8K3oFVtoObLn0RzJMNliyEd',
		callbackUrl: 'http://localhost:3000/authzero/callback',
	},
};
