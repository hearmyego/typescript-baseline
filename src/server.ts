import cluster from 'cluster';
import os from 'os';
import App from './app';

require('dotenv').config();

const PORT = parseInt(process.env.PORT || '3000');
const numberOfWorkers = parseInt(
	process.env.NumberOfWorkers || os.cpus().length.toString()
);

if (cluster.isMaster) {
	for (let index = 0; index < numberOfWorkers; index++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		cluster.fork();
	});
} else {
	const app = new App(PORT);
	app.listen();
}
