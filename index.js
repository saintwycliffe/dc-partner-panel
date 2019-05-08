const bodyParser = require("body-parser");
const express = require("express");
const OmxManager = require("omx-manager");
const manager = new OmxManager();
const ejsLayouts = require("express-ejs-layouts");
const socket = require('socket.io');
const app = express();

const server = app.listen(process.env.PORT || 3000);
const io = socket(server);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

const allVideos = ["play1", "play2", "play3"];

io.sockets.on('connection', function (socket) {
  console.log('New client @', socket.id);
  allVideos.forEach(function (video) {
    socket.on(video, function () {
      let playURL = '';
      if (video === 'play1') { playURL = "./public/YV.mp4" }
      if (video === 'play2') { playURL = "./public/JF.mkv" }
      if (video === 'play3') { playURL = "./public/FCBH1080.mp4" }
      let camera = manager.create(playURL);
      camera.play();
      camera.on('end', function () {
        io.emit('gohome');
      })
    });
  })
  socket.on('disconnect', function () { console.log('Disconnected', Date()) });
});

app.get('/', (req, res) => {
  console.log('Page Loaded');
  res.render('index.ejs');
});