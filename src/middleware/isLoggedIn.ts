import { Request, Response, NextFunction } from 'express';

export default function isLoggedIn(
	req: Request,
	res: Response,
	next: NextFunction
) {
	//if (req.isAuthenticated()) return next();

	res.redirect('/');
}
