import { Response, Request, NextFunction } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';

import { IViewModel } from '../core/IViewModel';
import { getTemplate, makeTitleFromSlug } from '../helpers/templateHelper';
import logger from '../global/logger';

export default class defaultController extends baseController {
	public path = '/'; // The path on which this.routes will be mapped
	public routes = [
		{
			path: '/:slug',
			method: Methods.GET,
			handler: this.slug,
			localMiddleware: [],
		},
		{
			path: '/',
			method: Methods.GET,
			handler: this.frontpage,
			localMiddleware: [],
		},
	];

	async frontpage(request: Request, response: Response): Promise<void> {
		logger.info('frontpage');
		const viewModel: IViewModel = {
			metaTags: {
				title: 'Forside',
			},
		};
		response.status(200).render('pages/index', viewModel);
	}

	async slug(request: Request, response: Response): Promise<void> {
		logger.info('slug');
		const slug = request.params.slug;
		const template = getTemplate(slug);

		let viewModel: IViewModel = {
			metaTags: {
				title: makeTitleFromSlug(slug),
			},
		};

		if (template.status === 400) {
			viewModel = {
				metaTags: {
					title: 'Side ikke fundet',
				},
			};
		}

		response.status(template.status).render(template.templatename, viewModel);
	}
}
