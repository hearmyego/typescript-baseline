import { Response, Request, NextFunction } from 'express';
import { Methods } from './Methods';

// Route interface for each route in `routes` field of `Controller` class.

export interface IRoute {
	path: string;
	method: Methods;
	handler: (
		req: Request,
		res: Response,
		next: NextFunction
	) => void | Promise<void>;
	localMiddleware: ((
		req: Request,
		res: Response,
		next: NextFunction
	) => void)[];
}
