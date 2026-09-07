import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import moduleRoutes from './routes/module.routes';
import progressRoutes from './routes/progress.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'nexalab-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/users', userRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: 'Erreur interne du serveur.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export default app;
