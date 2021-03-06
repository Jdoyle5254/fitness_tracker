const router = require("express").Router();
const Workout = require("../Models/workout.js");


router.get("/api/workouts/", (req, res) => {
    Workout
    // .find({})
      .aggregate(
        [
          //{$match : {_id:req.params.id}},
          {
            $project:
            { 
              day: "$day",
              totalDuration: { $sum: "$exercises.duration" },
              totalDistance: { $sum: "$exercises.distance" },
              totalweight: { $sum: "exercises.weight" },
              exercises: "$exercises"
            }
          }])
          .then(dbWorkout => {
        res.json(dbWorkout);
        console.log("the workout", dbWorkout)
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.get("/api/workouts/range", (req, res) => {
  Workout      .aggregate(
    [
      //{$match : {_id:req.params.id}},
      {
        $project:
        { 
          day: "$day",
          totalDuration: { $sum: "$exercises.duration" },
          totalDistance: { $sum: "$exercises.distance" },
          totalweight: { $sum: "exercises.weight" },
          exercises: "$exercises"
        }
      }])
.then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts/", ( req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.put("/api/workouts/:id", (req, res) => {
  console.log("this is the one", req.params.id);
  Workout.find({_id : req.params.id}).then(dbWorkout => {console.log('this id', dbWorkout)})

  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true, runValidators: true },
    console.log("this id", req.params.id)
  ).then(dbWorkout => {
    res.json(dbWorkout);
  })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router; 

