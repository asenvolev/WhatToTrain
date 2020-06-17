const express = require('express');
const app = express();
const port = 3000;
const hostname = 'localhost';

app.get('/', (req,res) =>{
    res.status(200).send("Hello World");
})

app.listen(port, err =>{
    if (err) {
        console.log('ERROR: ', err);
        return;
    }

    console.log(`Server running at http://${hostname}:${port}/`);
});
