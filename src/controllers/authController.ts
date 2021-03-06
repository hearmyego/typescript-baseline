import { Response, Request, NextFunction, RequestHandler } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';

import passport from 'passport';
import logger from '../global/logger';

export default class authController extends baseController {
	public path = '/local';
	public routes = [
		{
			path: '/logout',
			method: Methods.GET,
			handler: this.logoutGet,
			localMiddleware: [],
		},
		{
			path: '/login',
			method: Methods.POST,
			handler: this.loginPost,
			localMiddleware: [
				passport.authenticate('local-login', {
					successRedirect: '/profile',
					failureRedirect: '/local/login',
					failureFlash: false,
				}),
			],
		},
		{
			path: '/login',
			method: Methods.GET,
			handler: this.loginGet,
			localMiddleware: [],
		},
		{
			path: '/signup',
			method: Methods.GET,
			handler: this.signupGet,
			localMiddleware: [],
		},
		{
			path: '/signup',
			method: Methods.POST,
			handler: this.signupPost,
			localMiddleware: [
				passport.authenticate('local-signup', {
					successRedirect: '/profile', // redirect to the secure profile section
					failureRedirect: '/signup', // redirect back to the signup page if there is an error
					failureFlash: false, // allow flash messages
				}),
			],
		},
	];

	async loginPost(request: Request, response: Response): Promise<void> {
		logger.info('loginPost');
		response.status(200).render('pages/login');
	}

	async loginGet(request: Request, response: Response): Promise<void> {
		logger.info('loginGet');
		response.status(200).render('pages/login');
	}

	async signupPost(request: Request, response: Response): Promise<void> {
		logger.info('signupPost');
		response.status(200).render('pages/signup');
	}

	async signupGet(request: Request, response: Response): Promise<void> {
		logger.info('signupPost');
		response.status(200).render('pages/signup');
	}

	async logoutGet(request: Request, response: Response): Promise<void> {
		logger.info('logout');
		request.logout();
		response.redirect('/');
	}
}
