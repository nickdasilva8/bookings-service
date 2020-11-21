import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';

import films from './routes/films';
// Create Express server
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/films', films);

export default app;
