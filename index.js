const express = require("express");
const router = require("./routes/router");
const passport = require("passport");
const passportStrategy = require("./config/passport");
const db = require("./config/database");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8000;

app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`server is giving an error: ${err}`);
  } else {
    console.log("server is successfully up and running");
  }
});
