import { applicationInitializer } from './applicationInitializer';
import { handlebarsViewEngineInitializer } from './handlebarsViewEngineInitializer';
import { middlewareInitializer } from './middlewareInitializer';
import { routesInitializer } from './routesInitializer';
import { databaseInitializer } from './databaseInitializer';
import { passportInitializer } from './passportInitializer';
import { redisSessionInitializer } from './redisSessionInitializer';

export default [
	applicationInitializer,
	handlebarsViewEngineInitializer,
	middlewareInitializer,

	redisSessionInitializer,

	databaseInitializer,
	passportInitializer,

	routesInitializer,
];
