import { Response, Request } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';

import { IContentPayload } from '../core/IContentPayload';
import getTemplate from '../helpers/templateHelper';

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
		{
			path: '*',
			method: Methods.GET,
			handler: this.wildcard,
			localMiddleware: [],
		},
	];

	constructor() {
		super();
	}

	async frontpage(request: Request, response: Response): Promise<void> {
		console.log('frontpage');
		const payload: IContentPayload = {
			metaTags: {
				title: 'Forside',
			},
		};

		response.status(200).render('pages/index', payload);
	}

	async wildcard(request: Request, response: Response): Promise<void> {
		console.log('wildcard');
		const payload: IContentPayload = {
			metaTags: {
				title: 'Forside',
			},
		};

		response.status(200).render('pages/index', payload);
	}

	async slug(request: Request, response: Response): Promise<void> {
		console.log('slug');
		const slug = request.params.slug;
		const template = getTemplate(slug);
		response.status(template.status).render(template.templatename);
	}
}
