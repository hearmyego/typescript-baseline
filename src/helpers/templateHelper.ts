import fs from 'fs';
import path from 'path';
import appRoot from 'app-root-path';

import { ITemplate } from '../core/ITemplate';

export default function getTemplate(name: string): ITemplate {
	const templateName = 'pages/' + name;
	const filename = path.join(appRoot.path, 'views', templateName + '.hbs');

	if (!fs.existsSync(filename)) {
		return errorResponse;
	} else {
		return {
			templatename: templateName,
			status: 200,
		};
	}
}

export const errorResponse = {
	status: 404,
	templatename: 'pages/404',
};
