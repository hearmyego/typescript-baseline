import express, { Application } from 'express';
import BaseInitializer from './baseInitializer';

import session from 'express-session';
import redis from 'redis';
import redisStore from 'connect-redis';

export class redisSessionInitializer extends BaseInitializer {
	constructor(app: Application) {
		super(app);
	}

	public async intialize() {
		this.logger.info('redisSessionInitializer');

		const client = redis.createClient({
			url: process.env.REDIS_URL,
		});
		const redisStoreClient = redisStore(session);

		this.app.use(
			session({
				secret: 'tWNw61085nwvcLFJEVmQ',
				// create new redis store.
				store: new redisStoreClient({
					client: client,
				}),
				saveUninitialized: false,
				resave: false,
			})
		);

		this.app.use((requets, response, next) => {
			if (!requets.session) {
				this.logger.fatal('REDIS IS DOWN!');
				return next(new Error('oh no')); // handle error
			}
			next();
		});
	}
}
