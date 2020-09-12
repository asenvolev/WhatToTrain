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

const saveWorkout = (workout) => {
    // const workout = {
    //     workoutGroup : "Legs",
    //     workoutExcercises : [{excerciseName:"klek 5 po 30"}, {excerciseName:"prasec 5 po 30"}]
    // }

    workout.workoutExcercises.forEach(excercise => {
        let excerName = excercise.excerciseName.split(/(?:-|=)+/)[0].trim();
        console.log(excerName);
        let setsAndReps = excercise.excerciseName.substring(excercise.excerciseName.indexOf('-') + 1).trim();
        let setsAndRepsRegexp = /(\d+ sets) (((of )*(\d+ (- \d+)*))|(to failure))/g;
        let matches = setsAndRepsRegexp.exec(setsAndReps);
        console.log(matches);

        let setsNumber = +matches[2];
        let repsNumber = 0;
        let optionalRepsNumber = 0;
        let isToFailure = false;
        if(matches[7]){
            repsNumber = +matches[7];
            if (matches[9]) {
                optionalRepsNumber = +matches[9].replace( /(^.+)(\w\d+\w)(.+$)/g);
            }
        } else {
            isToFailure = true;
        }
        // console.log(setsNumber,repsNumber,optionalRepsNumber)
    });
}

const saveWeekWorkout = (req,res,next) => {
    let workouts = req.workouts;
    workouts.forEach(workout => {
        saveWorkout(workout);
    });
    next();
}

router.get('/', getWeekWorkout, structureWorkoutIntoJSON, (req, res) => {
    //res.status(200).send(req.workoutJSON);
    //console.log(req.workouts)
    res.render('home-page', {workouts: req.workouts});
})



router.post('/saveWeekWorkout', getWeekWorkout, structureWorkoutIntoJSON, saveWeekWorkout, (req, res) =>{
    res.render('home-page', {workouts: req.workouts});
})

module.exports = router;