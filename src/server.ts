import App from './app';

require('dotenv').config();

const PORT = parseInt(process.env.PORT || '3000');
const app = new App(PORT);

app.listen();
