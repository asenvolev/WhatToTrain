const mongoose = require('mongoose');

const ExcerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Excercise', ExcerciseSchema);