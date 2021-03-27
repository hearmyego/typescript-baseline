import { Response, Request, NextFunction, RequestHandler } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';
import isLoggedIn from '../middleware/isLoggedIn';
import { IViewModel } from '../core/IViewModel';
import logger from '../global/logger';

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

	async profile(request: Request, response: Response): Promise<void> {
		logger.info('profile');

		const viewModel: IViewModel = {
			metaTags: {
				title: 'Min profil',
			},
			profile: request.user,
		};

		// logger.info(viewModel);

		response.status(200).render('pages/profile', viewModel);
	}
}
