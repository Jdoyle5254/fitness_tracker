const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();


const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  }
);

// fixed this route to connect 
app.use(require("./routes/routes.js"));

app.get('/exercise', function(req, res){
  res.sendFile(__dirname + '/public/exercise.html');
});

app.get("/stats", function (req, res) {
  res.sendFile(__dirname + "/public/stats.html");
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

module.exports = app; 