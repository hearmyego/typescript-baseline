import fs from 'fs';
import path from 'path';
import appRoot from 'app-root-path';

import { ITemplate } from '../core/ITemplate';

export function getTemplate(name: string): ITemplate {
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

export function makeTitleFromSlug(slug: string) {
	if (slug.includes('-')) {
		let words = slug.split('-');

		for (let i = 0; i < words.length; i++) {
			let word = words[i];
			words[i] = titleCase(word);
		}

		return words.join(' ');
	} else {
		return titleCase(slug);
	}
}

export function titleCase(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
