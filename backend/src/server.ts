import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { auth } from './middleware/auth';
import logger from './utils/logger';
import instrumentRoutes from './routes/instruments';
import maintenanceRoutes from './routes/maintenance';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import gigsRoutes from './routes/gigs';
import bandRoutes from './routes/bands';
import reportRoutes from './routes/reports';

// Load environment variables
dotenv.config();

// Create Express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/instruments', auth, instrumentRoutes);
app.use('/api/maintenance', auth, maintenanceRoutes);
app.use('/api/users', auth, userRoutes);
app.use('/api/gigs', auth, gigsRoutes);
app.use('/api/bands', auth, bandRoutes);
app.use('/api/reports', auth, reportRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = err.statusCode || 500;
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app;