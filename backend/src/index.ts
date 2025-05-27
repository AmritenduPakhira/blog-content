import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import blogRoutes from './routes/blogRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/blogs', blogRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});