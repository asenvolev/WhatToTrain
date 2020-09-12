const express = require('express');
const app = express();
const port = 3000;
const hostname = 'localhost';
const handlebars = require('express-handlebars');
const homePage = require('./routes/home-page');
const connectDb = require('./database/dbConnection');

connectDb().then(async () => {
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
    app.set('views', './views');
    app.set('view options', { layout: 'main' });
    
    app.use(homePage)
    
    app.listen(port, err =>{
        if (err) {
            console.log('ERROR: ', err);
            return;
        }
    
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});