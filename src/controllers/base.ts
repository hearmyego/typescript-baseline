import express, {
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from 'express';
import { IController } from '../core/IController';
import getTemplate, { errorResponse } from '../helpers/templateHelper';

export default abstract class baseController {
	public template?: string;
	public baseUrl!: string;

	constructor() {
		console.log('Base constructor');
	}

	async process(request: Request, response: Response, next: NextFunction) {
		console.log('base process');

		// await this.serveTemplate(request, response);

		const instanceName = this.constructor.name;
		const templateName = this.template ?? request.params.slug ?? instanceName;
		const template = getTemplate(templateName);

		if (template.status == 404) {
			console.log(`404 Page not found: ${templateName}`, request);
		}

		response.status(template.status).render(template.templatename);
	}

	// async serveTemplate(request: Request, response: Response) {
	// 	console.log('serveTemplate');
	// 	const instanceName = this.constructor.name;
	// 	const templateName = this.template ?? request.params.slug ?? instanceName;
	// 	const template = getTemplate(templateName);

	// 	if (template.status == 404) {
	// 		console.log(`404 Page not found: ${templateName}`, request);
	// 	}

	// 	response.status(template.status).render(template.templatename);
	// }
}
