import { Application } from 'express';
import { IInitializer } from '../core/IInitializer';

export default abstract class BaseInitializer implements IInitializer {
	public app: Application;

	constructor(app: Application) {
		this.app = app;
		this.intialize();
	}

	public intialize(): void {
		console.log('BaseInitializer');
	}
}
