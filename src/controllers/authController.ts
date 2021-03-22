import { Response, Request, NextFunction, RequestHandler } from 'express';
import baseController from './baseController';
import { Methods } from '../core/Methods';
import passport from 'passport';

export default class authController extends baseController {
	public path = '/';
	public routes = [
		{
			path: '/logout',
			method: Methods.GET,
			handler: this.logout,
			localMiddleware: [],
		},
		{
			path: '/login', // Will become /:slug/<<VALUE>>
			method: Methods.POST,
			handler: this.loginPost,
			localMiddleware: [
				passport.authenticate('local-login', {
					successRedirect: '/profile', // redirect to the secure profile section
					failureRedirect: '/login', // redirect back to the signup page if there is an error
					failureFlash: false, // allow flash messages
				}),
			],
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
		console.log('loginPost');
		response.status(200).render('pages/login');
	}

	async signupPost(request: Request, response: Response): Promise<void> {
		console.log('signupPost');
		response.status(200).render('pages/signup');
	}

	async logout(request: Request, response: Response): Promise<void> {
		console.log('logout');
		request.logout();
		response.redirect('/');
	}
}
