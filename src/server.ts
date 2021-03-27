import cluster from 'cluster';
import os from 'os';
import App from './app';
import logger from './global/logger';

require('dotenv').config();

const PORT = parseInt(process.env.PORT || '3000');
const numberOfWorkers = parseInt(
	process.env.NumberOfWorkers || os.cpus().length.toString()
);

if (cluster.isMaster) {
	logger.info(`Master ${process.pid} is running`);

	for (let index = 0; index < numberOfWorkers; index++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		logger.fatal(`Worker ${worker.process.pid} just died`);
		cluster.fork();
	});
} else {
	const app = new App(PORT);
	app.listen();

	logger.info(`Worker ${process.pid} started`);
}
