import { Response, Request, NextFunction, RequestHandler } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';
import isLoggedIn from '../middleware/isLoggedIn';
import { IContentPayload } from '../core/IContentPayload';

export default class profileController extends baseController {
	public path = '/profile'; // The path on which this.routes will be mapped
	public routes = [
		{
			path: '/', // Will become /:slug/<<VALUE>>
			method: Methods.GET,
			handler: this.profile,
			localMiddleware: [isLoggedIn],
		},
	];

	constructor() {
		super();
	}

	async profile(request: Request, response: Response): Promise<void> {
		console.log('profile');

		const payload: IContentPayload = {
			metaTags: {
				title: 'Min profil',
			},
			profile: request.user,
		};

		response.status(200).render('pages/profile', payload);
	}
}