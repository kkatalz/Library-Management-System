import express from 'express';
import path from 'path';
import passport from './config/passport';
import routes from './routes';
import { notFound, errorHandler } from './middleware/error';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(passport.initialize());
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
