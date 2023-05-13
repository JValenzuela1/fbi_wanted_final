const superagent = require('superagent');
const urls = {
    looks: 'https://api.fbi.gov/wanted/v1/list',
    uid: 'https://api.fbi.gov/@wanted-person/'
};

const searchLooks = async (params) => {
    try {
        const searchResults = await superagent.get(urls.looks).query(params);
        return searchResults.body;

    } catch(error) {
        console.log('Error: ', error['response']);
    }
};

const searchUID = async (uid) => {
    try{
        const idResults = await superagent.get(urls.uid + uid);
        return idResults.body;
        
    } catch(error) {
        console.log('Error: ', error['response']['_body']['reason']);
    }
};

module.exports = {
    searchLooks,
    searchUID
};