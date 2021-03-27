import userModel from '../../database/userModel';
import logger from '../../global/logger';

export function serializeUser(): (
	user: Express.User,
	done: (err: any, id?: unknown) => void
) => void {
	return function (user: any, done) {
		logger.info('serializeUser');

		//@ts-ignore
		done(null, user.id);
	};
}

export function deserializeUser(): (
	id: unknown,
	done: (err: any, user?: false | Express.User | null | undefined) => void
) => void {
	return async function (id, done) {
		logger.info('deserializeUser');

		try {
			const user = (await userModel.findById(id).lean()) as Express.User;
			done(null, user);
		} catch (error) {
			done(error, null);
		}
	};
}
