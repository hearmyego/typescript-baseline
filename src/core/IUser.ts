export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	courseAccess: string[];
	signupToken: string;
	local?: ILocalSetting;
}

export interface ILocalSetting {
	email: string;
	password: string;
}
