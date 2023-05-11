const router = require('express').Router();
const FBI = require('../../fbi-module/api.js');

router.use((req, res, next) => {
    const { headers, originalUrl, query } = req;


    next();
});

router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

router.get('/:id/details', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

module.exports = router;