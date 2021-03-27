import { Request, Response, NextFunction } from 'express';
import logger from '../global/logger';

export default function isLoggedIn(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.isAuthenticated()) {
		logger.info('User is login');
		return next();
	}
	logger.info('User not login, redirecting');
	res.redirect('/');
}
