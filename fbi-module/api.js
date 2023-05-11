const superagent = require('superagent');
const urls = {
    looks: 'https://api.fbi.gov/wanted/v1/list',
    uid: 'https://api.fbi.gov/@wanted-person/'
};

const searchLooks = async (params) => {
    try {
        const res = await superagent.get(urls.looks).query(params);
        return res.body;

    } catch(error) {
        console.log('Error: ', error['response']);
    }
};

const searchUID = async (uid) => {
    try{
        const res = await superagent.get(urls.uid + uid);
        return res.body;
        
    } catch(error) {
        console.log('Error: ', error['response']['_body']['reason']);
    }
};

module.exports = {
    searchLooks,
    searchUID
};