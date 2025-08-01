const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Create Express application
const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration - Fixed for CORS issues
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('/{*splat}', cors(corsOptions)); // Handle preflight requests with named wildcard

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic test route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Trip-AI API Server is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    aiEnabled: !!process.env.GEMINI_API_KEY
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes with error handling
try {
  app.use('/api/auth', require('./routes/auth'));
} catch (error) {
  console.error('Auth routes error:', error.message);
}

try {
  app.use('/api/trips', require('./routes/trips'));
} catch (error) {
  console.error('Trips routes error:', error.message);
}

// Protected profile route
const authenticateUser = require('./middleware/auth');
app.get('/api/profile', authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: 'Profile data retrieved successfully',
    data: {
      user: req.user
    }
  });
});

// 404 handler - EXPRESS V5 COMPATIBLE WITH NAMED WILDCARD
app.use('/{*splat}', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
