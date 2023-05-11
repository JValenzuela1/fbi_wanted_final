const { MongoClient } = require('mongodb');
const config = require('../config.json');

const mongo = () => {
    const uri = `mongodb+srv://${config.username}:${config.password}@cluster0.0joto0c.mongodb.net/${config.db}?retryWrites=true&w=majority`;
    let db = null;

    async function connect() {
        try {
            const client = new MongoClient(uri);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    async function save(data) {
        try {
            const collection = db.collection(config.collection);

            await collection.insertOne(data);
            console.log('Data inserted to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    async function find(search) {
        try {
            const collection = db.collection(config.collection);

            if (search) {
                return await collection.find({searchTerm : search}).next();
            }
            else {
                return await collection.find({}).toArray();
            }

        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        find
    };
};

module.exports = mongo();