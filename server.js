const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const PORT = process.env.PORT || 5000 || 3000;

/* middlewares setup */

//bodyparser middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

/* mongo db connection  */
const mongoose = require("mongoose");
const { mongoUri } = require("./config/keys");

mongoose
  .connect(
    "mongodb+srv://mohammedEssam:1112mohammed@cluster0-wfibb.mongodb.net/tripShare?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to mongo"))
  .catch(err => console.log(err));
/* app config */
app.listen(PORT, "localhost", () => {
  console.log("app is running on port", PORT);
});
app.get("/test", (req, res) => {
  res.json({ worked: true });
  console.log("called successfulllllllyyyy");
});
app.use("/assets", express.static(path.join(__dirname, "assets")));

/* passport config */
require("./config/passport/jwt-strategy")(passport);
//setup routs
const user = require("./api/user");
const place = require("./api/place");
app.use("/api/user", user);
app.use("/api/place", place);
