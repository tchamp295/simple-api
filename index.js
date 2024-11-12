// index.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Simple API!');
});

// Use user routes
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
