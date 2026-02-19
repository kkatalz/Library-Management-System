import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});

export default app;
