import { Response, Request, NextFunction, RequestHandler } from 'express';
import Controller from './controller';
import { Methods } from '../core/Methods';
import isLoggedIn from '../middleware/isLoggedIn';
import { IContentPayload } from '../core/IContentPayload';

export default class defaultController extends Controller {
	public path = '/'; // The path on which this.routes will be mapped
	public routes = [
		{
			path: '/', // Will become /:slug/<<VALUE>>
			method: Methods.GET,
			handler: this.rootSite,
			localMiddleware: [],
		},
		{
			path: '/profile', // Will become /:slug/<<VALUE>>
			method: Methods.GET,
			handler: this.hemmelig,
			localMiddleware: [isLoggedIn],
		},
		{
			path: '/:slug', // Will become /:slug/<<VALUE>>
			method: Methods.GET,
			handler: this.slug,
			localMiddleware: [],
		},
	];

	constructor() {
		super();
	}

	async rootSite(request: Request, response: Response): Promise<void> {
		const payload: IContentPayload = {
			metaTags: {
				title: 'Forside',
			},
		};

		response.status(200).render('pages/index', payload);
	}

	async slug(request: Request, response: Response): Promise<void> {
		response.status(200).render('pages/slug');
	}

	async hemmelig(request: Request, response: Response): Promise<void> {
		response.status(200).render('pages/hemmelig');
	}
}
