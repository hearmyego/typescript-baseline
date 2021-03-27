import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import logger from '../../global/logger';

export const authZeroCallback = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate('authZero', (err, user, info) => {
		logger.info(err);
		logger.info(user);
		logger.info(info);

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
