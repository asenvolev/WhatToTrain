const express = require('express');
const router = express.Router();
const fileStream = require('fs');

const getWeekWorkout = (req,res, next) => {
    const weekWorkoutstream = fileStream.createReadStream('./FreeWeekWorkout.txt');
    weekWorkoutstream.on('data', data => req.workout = data.toString());
    weekWorkoutstream.on('end', () => next())
}

const structureWorkoutIntoJSON = (req,res,next) =>{
    console.log(req.workout);
    const array = req.workout.split('\n');
    let result = {
        workouts:[]
    };
    for (let i = 0; i < array.length; i++) {
        
        let workoutObj = {
            workoutGroup: array[i],
            workoutExcercises: array[i+1]
        }
        result.workouts.push(workoutObj)
    }
    req.workoutJSON = JSON.stringify(result);
    next();
}

router.get('/', getWeekWorkout, structureWorkoutIntoJSON, (req, res) =>{
    res.status(200).send(req.workoutJSON);
})

module.exports = router;