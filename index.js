const bodyParser = require("body-parser");
const express = require("express");
const OmxManager = require("omx-manager");
const manager = new OmxManager();
const ejsLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

function getCamera(req, res, cam) {
  cam.play();
  cam.on("end", function() {
    return res.redirect("/");
  });
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/play1", (req, res) => {
  let camera = manager.create("./public/YV.mp4");
  getCamera(req, res, camera);
});

app.get("/play2", (req, res) => {
  let camera = manager.create("./public/JF.mkv");
  getCamera(req, res, camera);
});

app.get("/play3", (req, res) => {
  let camera = manager.create("./public/FCBH1080.mp4");
  getCamera(req, res, camera);
});

app.listen("3000", () => {});
