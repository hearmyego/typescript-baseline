import userModel from '../../database/userModel';

export function serializeUser(): (
	user: Express.User,
	done: (err: any, id?: unknown) => void
) => void {
	return function (user: any, done) {
		console.log('serializeUser');

		//@ts-ignore
		done(null, user.id);
	};
}

export function deserializeUser(): (
	id: unknown,
	done: (err: any, user?: false | Express.User | null | undefined) => void
) => void {
	return async function (id, done) {
		console.log('deserializeUser');

		try {
			const user = (await userModel.findById(id).lean()) as Express.User;
			done(null, user);
		} catch (error) {
			done(error, null);
		}
	};
}
