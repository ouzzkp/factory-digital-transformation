const express = require('express');
const app = express();

app.get('/status', (req, res) => {
    res.json({ status: 'Production service is up and running' });
});

app.listen(4001, () => {
    console.log('Production service listening on port 4001');
});