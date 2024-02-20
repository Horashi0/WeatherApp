require('dotenv').config();

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const rateLimit = require('express-rate-limit');
const https = require('https');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/horashio.co.uk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/horashio.co.uk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/horashio.co.uk/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

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

app.use(cors({credentials: true, origin: true}));

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
	console.log(`HTTPS Server running on port ${PORT}`);
});
