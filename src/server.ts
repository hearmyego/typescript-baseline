import cluster from 'cluster';
import os from 'os';
import App from './app';

const PORT = parseInt(process.env.PORT || '3000');
require('dotenv').config();

if (cluster.isMaster) {
	for (let index = 0; index < os.cpus().length; index++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		cluster.fork();
	});
} else {
	const app = new App(PORT);
	app.listen();
}
