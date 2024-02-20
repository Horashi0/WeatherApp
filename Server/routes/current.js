const url = require('url');
const express = require('express');
const needle = require('needle');
const apiCache = require('apicache');
const router = express.Router();

// ENV vars

const API_CURRENT_URL = process.env.API_CURRENT_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
let cache = apiCache.middleware;

router.get('/', cache('2 minutes'), async(req, res) => {
    try {
    	res.setHeader('Access-Control-Allow-Origin', '*');
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        const apiRes = await needle('get', `${API_CURRENT_URL}?${params}`);
        const data = apiRes.body;

        // Log request to public API
        if(process.env.NODE_ENV !== 'production')
        {
            console.log(`REQUEST: ${API_CURRENT_URL}?${params}`);
        }


        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({error});
    }
    
})

module.exports = router;
