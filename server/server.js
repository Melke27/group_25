const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

const { connectDB, dbUtils } = require('./config/database');
const config = require('./config/env');
const NotificationSocketService = require('./services/notificationSocket');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const superAdminRoutes = require('./routes/superAdmin');
// const museumAdminRoutes = require('./routes/museumAdmin');
const museumRoutes = require('./routes/museums'); // Added museum management routes
const artifactRoutes = require('./routes/artifacts'); // Added artifact management routes
const staffRoutes = require('./routes/staff'); // Added staff management routes
const eventRoutes = require('./routes/event'); // Added event management routes
const organizerRoutes = require('./routes/organizer');
// const visitorRoutes = require('./routes/visitor');
// const toursRoutes = require('./routes/tours');
const tourPackageRoutes = require('./routes/TourPackage');
const bookingRoutes = require('./routes/Booking');
const messageRoutes = require('./routes/Message');
const virtualMuseumRoutes = require('./routes/virtualMuseum');
const mapRoutes = require('./routes/map');
// const chatRoutes = require('./routes/chat');
const learningRoutes = require('./routes/learning');
const courseManagementRoutes = require('./routes/courseManagement');
const enrollmentManagementRoutes = require('./routes/enrollmentManagement');
const educationalContentManagementRoutes = require('./routes/educationalContentManagement');
// const usersRoutes = require('./routes/users');
// const userRoutes = require('./routes/User');
// const visitorRoutes = require('./routes/visitor');
const rentalsRoutes = require('./routes/rentals');

// Import middleware
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./middleware/logger');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176'
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed from this origin: ' + origin), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}));
// Handle preflight
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads with CORS headers
app.use('/uploads', (req, res, next) => {
  // Set CORS headers for static files
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, express.static('uploads'));

// Logging middleware
app.use(morgan('combined'));
app.use(logger);

// Initialize notification socket service
const notificationSocketService = new NotificationSocketService(io);

// Socket.IO connection handling for chat (keep existing functionality)
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join-chat', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined chat`);
  });

  socket.on('send-message', (data) => {
    io.to(`user-${data.userId}`).emit('new-message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io and notification service accessible to routes
app.set('io', io);
app.set('notificationService', notificationSocketService);

// API Routes
app.use('/api/auth', authRoutes);
// Additional routes can be enabled as needed
// app.use('/api/users', usersRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/visitor', visitorRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/super-admin', superAdminRoutes);
// app.use('/api/museum-admin', museumAdminRoutes);
app.use('/api/museums', museumRoutes); // Added museum management API
app.use('/api/artifacts', artifactRoutes); // Added artifact management API
app.use('/api/staff', staffRoutes); // Added staff management API
app.use('/api/events', eventRoutes); // Added event management API
app.use('/api/organizer', organizerRoutes);
// app.use('/api/tours', toursRoutes);
app.use('/api/tour-packages', tourPackageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/virtual-museum', virtualMuseumRoutes);
app.use('/api/map', mapRoutes);
// app.use('/api/chat', chatRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/learning', courseManagementRoutes);
app.use('/api/learning', enrollmentManagementRoutes);
app.use('/api/learning', educationalContentManagementRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection status
    const dbStatus = dbUtils.getConnectionStatus();
    const isDbConnected = dbUtils.isConnected();

    let dbStats = null;
    if (isDbConnected) {
      try {
        dbStats = await dbUtils.getDbStats();
      } catch (error) {
        console.error('Error getting db stats:', error.message);
      }
    }

    const healthStatus = {
      status: isDbConnected ? 'OK' : 'DEGRADED',
      message: 'EthioHeritage360 Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStatus,
        connected: isDbConnected,
        stats: dbStats
      },
      memory: process.memoryUsage(),
      nodeVersion: process.version
    };

    const statusCode = isDbConnected ? 200 : 503;
    res.status(statusCode).json(healthStatus);

  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to EthioHeritage360 API - Ethiopian Museum Platform',
    version: '1.0.0',
    description: 'Three-tier museum management system with Super Admin, Museum Admin, and User roles',
    features: [
      'User Management with Role-based Access Control',
      'Museum Administration',
      'Artifact Rental System with Approval Workflow',
      'Heritage Site Management',
      'Virtual Museum Tours',
      'Event Management and Booking',
      'Real-time Notifications'
    ],
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      museums: '/api/museums', // Added museums endpoint
      artifacts: '/api/artifacts', // Added artifacts endpoint
      rentals: '/api/rentals',
      admin: '/api/admin',
      superAdmin: '/api/super-admin',
      museumAdmin: '/api/museum-admin',
      museum: '/api/museum',
      organizer: '/api/organizer',
      visitor: '/api/visitor',
      tours: '/api/tours',
      virtualMuseum: '/api/virtual-museum',
      map: '/api/map',
      chat: '/api/chat',
      learning: '/api/learning',
      health: '/api/health'
    },
    setup: {
      message: 'To get started, create your first Super Admin account',
      endpoint: 'POST /api/auth/register',
      documentation: 'See API documentation for complete setup guide'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = config.PORT;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});

module.exports = app;

