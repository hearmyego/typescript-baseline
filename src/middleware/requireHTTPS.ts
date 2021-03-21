import { Request, Response, NextFunction } from 'express';

export default function requireHTTPS(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// The 'x-forwarded-proto' check is for Heroku
	if (
		!req.secure &&
		req.get('x-forwarded-proto') !== 'https' &&
		process.env.NODE_ENV == 'production' &&
		process.env.REQHTTPS == 'true'
	) {
		return res.redirect('https://' + req.get('host') + req.url);
	}

	next();
}
