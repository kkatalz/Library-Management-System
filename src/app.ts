import express from 'express';
import passport from './config/passport';
import routes from './routes';
import { notFound, errorHandler } from './middleware/error';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
