$(document).ready(function () {
  $("body").fadeIn(2000);
  const socket = io();
  const allVideos = ["play1", "play2", "play3"];

  function fadeToVideo(endpoint) {
    event.preventDefault();
    let toVideo = endpoint;
    $('.container').fadeOut(1000, function () {
      socket.emit(toVideo);
    });
  }

  allVideos.forEach(function (video) {
    $("." + video).click(function () {
      fadeToVideo(video);
    });
  });

  socket.on('gohome', function () {
    $('.container').fadeIn();
  });

});
