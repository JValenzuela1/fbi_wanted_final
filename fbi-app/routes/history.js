const router = require('express').Router();

router.use((req, res, next) => {
    console.log('Running Router Level Middleware For HISTORY');



    next();
});

router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.toString());
    } 
});

module.exports = router;