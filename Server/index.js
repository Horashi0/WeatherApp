require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const rateLimit = require('express-rate-limit');

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100
})
app.use(limiter);
app.set('trust proxy', 1);

// Routes
app.use('/current', require('./routes/current.js'));
app.use('/forecast', require('./routes/forecast.js'));

// Enable cors
app.use(cors());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));