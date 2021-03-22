export function serializeUser(): (
	user: Express.User,
	done: (err: any, id?: unknown) => void
) => void {
	return function (user: any, done) {
		console.log('serializeUser');

		//@ts-ignore
		done(null, user._id);
	};
}
