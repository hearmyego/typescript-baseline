import { Response, Request, NextFunction, RequestHandler } from 'express';
import Controller from './controller';
import { Methods } from '../core/Methods';

export default class SlugController extends Controller {
	public path = '/:slug'; // The path on which this.routes will be mapped
	public routes = [
		{
			path: '/', // Will become /:slug/<<VALUE>>
			method: Methods.GET,
			handler: this.handleLogin,
			localMiddleware: [],
		},
		// Other routes...
	];

	constructor() {
		super();
	}

	async handleLogin(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		response.status(200).render('pages/index');
	}
	// Other handlers...
}
