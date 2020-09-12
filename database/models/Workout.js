const mongoose = require('mongoose');
const Excercise = require('./Excercise');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    excercises: [{
        type: Excercise,
        required: true
    }]
});

module.exports = mongoose.model('Workout', WorkoutSchema);