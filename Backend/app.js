require('dotenv').config();
const express = require('express');
const connectToDB = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./router/foodItems.router');
const orderrouter = require('./router/orders.router');
const authRouter = require('./router/userAuth.router');

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  // This is crucial for cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/fooditems', router);
app.use('/success', orderrouter);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

connectToDB();

module.exports = app;