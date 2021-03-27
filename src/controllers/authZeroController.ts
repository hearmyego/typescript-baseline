import { Response, Request, NextFunction, RequestHandler } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';
import passport from 'passport';
import { authZeroCallback } from '../auth/callback/authZeroCallback';
import querystring from 'querystring';
import logger from '../global/logger';

export default class authZeroController extends baseController {
	public path = '/authzero';
	public routes = [
		{
			path: '/logout',
			method: Methods.GET,
			handler: this.logoutGet,
			localMiddleware: [],
		},
		{
			path: '/login',
			method: Methods.GET,
			handler: this.loginGet,
			localMiddleware: [
				passport.authenticate('authZero', {
					scope: 'openid email profile app_metadata',
				}),
			],
		},
		{
			path: '/callback',
			method: Methods.GET,
			handler: this.callbackGet,
			localMiddleware: [
				passport.authenticate('authZero', {
					successRedirect: '/profile',
					failureRedirect: '/fail',
					failureFlash: false,
				}),
			],
		},
	];

	async callbackGet(request: Request, response: Response): Promise<void> {
		logger.info('callbackGet');
		response.redirect('/profile');
	}

	async loginGet(request: Request, response: Response): Promise<void> {
		logger.info('loginGet');
		response.redirect('/');
	}

	async logoutGet(request: Request, response: Response): Promise<void> {
		logger.info('logout');
		request.logOut();

		const logoutURL = new URL(`https://hearmyego.eu.auth0.com/v2/logout`);

		const searchString = querystring.stringify({
			client_id: 'dZTrmywYnRZobOkjueBVOogIYscOIkh2',
			returnTo: 'http://localhost:3000/',
		});
		logoutURL.search = searchString;

		response.redirect(logoutURL.toString());
	}
}
