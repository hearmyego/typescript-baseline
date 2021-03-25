import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../core/IUser';

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

const localSettingSchema = new Schema(
	{
		email: String,
		password: String,
	},
	{ _id: false }
);

const userSchema = new Schema<IUserDocument, IUserModel>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: String,
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	},
	courseAccess: [String],
	signupToken: String,
	local: localSettingSchema,
});

export default model<IUserDocument, IUserModel>('User', userSchema);
