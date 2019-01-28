$(document).ready(function() {
  $("body").fadeIn(2000);
  var allVideos = ["play1", "play2", "play3"];

  function fadeToVideo(endpoint) {
    event.preventDefault();
    var toVideo = endpoint;
    $("body").fadeOut(1000, function() {
      window.location.href = "/" + toVideo;
    });
  }

  allVideos.forEach(function(video) {
    $("." + video).click(function() {
      fadeToVideo(video);
    });
  });
});
