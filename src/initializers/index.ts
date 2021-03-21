import { application } from './application';
import { handlebarsViewEngine } from './handlebarsViewEngine';
import { middleware } from './middleware';
import { routesInitializer } from './routesInitializer';
import { databaseInitializer } from './databaseInitializer';
import { passportInitializer } from './passportInitializer';

export default [
	application,
	handlebarsViewEngine,
	middleware,

	databaseInitializer,
	passportInitializer,

	routesInitializer,
];
