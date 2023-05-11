const express = require('express');

const app = express();
const port = 8888;

const search = require('./routes/search.js');
const history = require('./routes/history.js');

app.use('/search', search);
app.use('/history', history);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});