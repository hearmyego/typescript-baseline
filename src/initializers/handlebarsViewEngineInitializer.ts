import { Application } from 'express';
import BaseInitializer from './baseInitializer';

import path from 'path';
import appRoot from 'app-root-path';
import exphbs from 'express-handlebars';
import helpers from '../helpers/handlebarsHelpers';

export class handlebarsViewEngineInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public intialize(): void {
		this.logger.info('handlebarsViewEngineInitializer');

		const viewFolder = path.join(appRoot.path, 'views');
		const partialsDir = path.join(viewFolder, 'partials');
		const layoutsDir = path.join(viewFolder, 'layout');
		const defaultLayout = path.join(layoutsDir, 'default');

		let hbs = exphbs.create({
			partialsDir: partialsDir,
			layoutsDir: layoutsDir,
			defaultLayout: defaultLayout,
			extname: '.hbs',
			helpers: helpers,
		});

		this.app.engine('hbs', hbs.engine);

		this.app.set('view engine', 'hbs');
		this.app.set('views', viewFolder);
	}
}
