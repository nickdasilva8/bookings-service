import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import cors from 'express-cors';

import films from './routes/films';
import seating from './routes/seating';
// Create Express server
const app = express();

// Ideally services shouldn't even be accessible by anything that isn't within the local network
// So why this assignment has a CORS requirement is a bit unclear.
// The controller isn't sharing it's API with any other controller.
app.use(
  cors({
    allowedOrigins: ['localhost:3000']
  })
);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/films', films);
app.use('/seating', seating);

export default app;
