const express = require('express');
const app = express();
const port = 3000;
const hostname = 'localhost';
const homePage = require('./routes/home-page');

app.use(homePage)

app.listen(port, err =>{
    if (err) {
        console.log('ERROR: ', err);
        return;
    }

    console.log(`Server running at http://${hostname}:${port}/`);
});
