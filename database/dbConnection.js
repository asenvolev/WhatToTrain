const mongoose = require('mongoose');

const connectDb = () => {
    return mongoose.connect('mongodb://localhost:27017/WhatToTrain', { useNewUrlParser: true, useUnifiedTopology:true});
};

module.exports = connectDb;