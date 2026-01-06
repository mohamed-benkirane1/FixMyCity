const express = require('express');
require('dotenv').config();

const app = express();

// Connexion DB
const dbConnect = require('./config/db');
dbConnect();

// Middlewares
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.json({ message: '✅ FixMyCity API is working' });
});

// ✅ imports explicites (pour éviter les surprises)
const authRoutes = require('./routes/AuthRoute');
const reportRoutes = require('./routes/ReportRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

// ✅ petite vérif (ne crash pas, juste info)
console.log("authRoutes type:", typeof authRoutes);
console.log("reportRoutes type:", typeof reportRoutes);
console.log("errorMiddleware type:", typeof errorMiddleware);

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Static uploads
app.use('/uploads', express.static('uploads'));

// Error middleware (dernier)
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
