import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const authZeroCallback = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate('authZero', (err, user, info) => {
		console.log(err);
		console.log(user);
		console.log(info);

		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/login');
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			//@ts-ignore
			const returnTo = req.session.returnTo;
			//@ts-ignore
			delete req.session.returnTo;

			res.redirect(returnTo || '/profile');
		});
	});
};
