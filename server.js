const express = require("express");
const mongoose = require("mongoose")
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cdainterview");

// db.Login.create({ name: "name", username: "user", password: "pass", id: "1"})
//   .then(function(dbLogin) {
//     console.log(dbLogin);
//   })
//   .catch(function(err){
//     console.log(err.message)
//   })

app.get("/login", function(req, res){
  db.Login.findAll({})
  .then(function(dbLogin){
    res.json(dbLogin);
    console.log(dbLogin)
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });

})






// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

