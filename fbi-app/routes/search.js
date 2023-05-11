const router = require('express').Router();
const FBI = require('fbi-module');
const db = require('../db');

const _fomartResult = (data) => {
    let result = [];

    data.items.forEach((record) => {
        result.push({
            'display' : record.title,
            'id' : record.uid
        });
    });

    return result;
};

router.use((req, res, next) => {

    next();
});

router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { hair = '', page = 1 } = query;

        const params = {
            hair,
            page
        };

        const results = await FBI.searchLooks(params);

        const result = {
            'searchTerm' : query.hair,
            'page' : results.page,
            results : _fomartResult(results)
        };

        res.json(result);

        const history = {
            'searchTerm' : query.hair,
            'searchCount' : results.total,
            'lastSearched' : new Date()
        };

        db.save(history);
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