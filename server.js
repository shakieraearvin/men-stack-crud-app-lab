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

  app.get("/cheeses", async (req, res) => {
    const allCheeses = await Cheese.find();
    console.log(allCheeses);
    res.render("cheeses/index.ejs", { cheeses: allCheeses });
  });
  
app.get("/cheeses/new", (req, res) => {
    res.render("fruits/new.ejs");
  });



app.post("/cheeses", async (req, res) => {
    if (req.body.isStinky === "on") {
      req.body.isStinky = true;
    } else {
      req.body.isStinky = false;
    }
    await Cheese.create(req.body);
    res.redirect("/cheeses");
  });
  










app.listen(3000, () => {
  console.log('Listening on port 3000');
});
