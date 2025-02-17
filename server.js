const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// middleware 
app.use(express.urlencoded({ extended: false }));




// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /fruits/new
app.get("/cheeses/new", (req, res) => {
    res.render("fruits/new.ejs");
  });



app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });
  


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
