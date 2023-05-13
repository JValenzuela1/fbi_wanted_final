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
            'searchTerm' : hair,
            results : _fomartResult(results)
        };

        res.json(result);

        const history = {
            'searchTerm' : hair,
            'searchCount' : results.total,
            'lastSearched' : new Date()
        };

        let doc = await db.find(hair);
        if (doc === null) {
            db.save(history);
        }
        else {
            db.update(hair, history);
        }
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

router.get('/:id/details', async (req, res) => {
    try {
        const { params, query } = req;
        const { id } = params; 
        const { hair = '' } = query;

        const result = await FBI.searchUID(id);
        // add selection
        const doc = await db.find(hair);
        if ('selection' in doc) {
            doc.selection.push(
                {
                    'display' : result.title,
                    'id' : result.uid
                }
            );
        }
        else {
            doc.selection = [
                {
                    'display' : result.title,
                    'id' : result.uid
                }
            ];
        }
        db.update(hair, doc);

        res.json(result);
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

module.exports = router;