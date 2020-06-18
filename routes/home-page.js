const express = require('express');
const router = express.Router();
const fileStream = require('fs');

router.get('/', (req,res) => {
    let weekWorkoutText = fileStream.ReadStream('./FreeWeekWorkout.txt').toString();
    let weekWorkoutJSON = structureWorkoutIntoJSON(weekWorkoutText);
    res.send(weekWorkoutJSON);
})

const structureWorkoutIntoJSON = ((weekWorkoutText) =>{
    let array = weekWorkoutText.split('\n\n');
    result = {
        workouts:[]
    };
    for (let i = 0; i < array.length; i+=2) {
        const workoutObj = {
            workoutGroup: array[i],
            workoutExcercises: array[i+1]
        }
        result.workouts.push(workoutObj)
    }
    workoutJSON = JSON.stringify(result);
    return workoutJSON
})

module.exports = router;