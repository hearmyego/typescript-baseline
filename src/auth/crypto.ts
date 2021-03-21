import bcrypt from 'bcrypt-nodejs';

export function generateHash(password: string): string {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// checking if password is valid
export function validPassword(password1?: string, password2?: string): boolean {
	if (password1 && password2) return bcrypt.compareSync(password1, password2);
	return false;
}
