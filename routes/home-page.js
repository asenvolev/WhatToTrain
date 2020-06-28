const express = require('express');
const router = express.Router();
const fileStream = require('fs');

const getWeekWorkout = (req,res, next) => {
    const weekWorkoutstream = fileStream.createReadStream('./FreeWeekWorkout.txt');
    weekWorkoutstream.on('data', data => req.workout = data.toString());
    weekWorkoutstream.on('end', () => next())
}

const structureWorkoutIntoJSON = (req,res,next) =>{
    const array = req.workout.split('\n');
    const result = {
        workouts:[]
    };

    let isGroupName = true;
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        if (!element.trim()) {
            element = array[++i];
        }
        let workoutObj = {}
        
        if (isGroupName) {
            workoutObj.workoutGroup = element;
            isGroupName = !isGroupName;
            element = array[++i];
        }
        workoutObj.workoutExcercises =[];
        element = array[++i];
        while (i < array.length && element.trim()) {
            workoutObj.workoutExcercises.push({excerciseName:element});
            element = array[++i];
        }

        result.workouts.push(workoutObj);
        isGroupName = true;
    }

    req.workouts = result.workouts;//JSON = JSON.stringify(result);
    next();
}

router.get('/', getWeekWorkout, structureWorkoutIntoJSON, (req, res) =>{
    //res.status(200).send(req.workoutJSON);
    //console.log(req.workouts)
    res.render('home-page', {workouts: req.workouts});
})

module.exports = router;