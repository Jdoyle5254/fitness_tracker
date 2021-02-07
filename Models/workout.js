const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [ {
        type: {
            type: String,
            trim: true,
            required: "Type is required"
        },
        name: {
            type: String,
            trim: true,
            required: "Name is required"

        },
        duration: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
    },   {toJSON: {virtuals:true}}
    ]
});

// TODO create virtuals function see mongoose doc.

// TODO create server file and finish schema

const Workout = mongoose.model("Workout", WorkoutSchema); 
module.exports = Workout;