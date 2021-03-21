export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	local?: ILocalSetting;
}

export interface ILocalSetting {
	email: string;
	password: string;
}
