const router = require('express').Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const uri =
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.0joto0c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

router.use((req, res, next) => {
    console.log('Running Router Level Middleware For HISTORY');



    next();
});

router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error.toString());
    } finally {
        await client.close();
    }
});

module.exports = router;