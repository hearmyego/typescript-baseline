import { Router } from 'express';
import { IRoute } from '../core/IRoute';

export default abstract class baseController {
	public router: Router = Router();
	public abstract path: string;
	protected abstract readonly routes: Array<IRoute> = [];

	public setRoutes = (): Router => {
		for (const route of this.routes) {
			switch (route.method) {
				case 'GET':
					this.router.get(route.path, route.localMiddleware, route.handler);
					break;
				case 'POST':
					this.router.post(route.path, route.localMiddleware, route.handler);
					break;
				case 'PUT':
					this.router.put(route.path, route.localMiddleware, route.handler);
					break;
				case 'DELETE':
					this.router.delete(route.path, route.localMiddleware, route.handler);
					break;
				default:
				// Throw exception
			}
		}
		return this.router;
	};
}
