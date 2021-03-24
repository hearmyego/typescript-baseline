import { applicationInitializer } from './applicationInitializer';
import { handlebarsViewEngineInitializer } from './handlebarsViewEngineInitializer';
import { middlewareInitializer } from './middlewareInitializer';
import { routesInitializer } from './routesInitializer';
import { databaseInitializer } from './databaseInitializer';
import { passportInitializer } from './passportInitializer';

export default [
	applicationInitializer,
	handlebarsViewEngineInitializer,
	middlewareInitializer,

	databaseInitializer,
	passportInitializer,

	routesInitializer,
];
