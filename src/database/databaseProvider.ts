import { IUser } from '../core/IUser';
import userModel from './userModel';

export async function GetUserByEmail(email: string): Promise<IUser | null> {
	var user = await userModel.findOne({ 'local.email': email }).lean();

	return null;
}
