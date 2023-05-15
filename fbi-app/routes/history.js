const router = require('express').Router();
const db = require('../db');

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    try {
        const history = await db.find();

        res.json(history);
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

router.get('/:searchTerm', async (req, res) => {
    try {
        const { searchTerm } = req.params;

        let history = await db.find(searchTerm);

        if(!history) {
            return res.status(404).json({ error: 'Search Term Does Not Exist in History'});
        }
        else {
            await db.update(searchTerm, { lastSearched: new Date() });
        }

        res.json(history);
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

module.exports = router;