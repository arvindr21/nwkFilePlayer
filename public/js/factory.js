  app.factory('FetchFileFactory', ['$http',
    function($http) {
      var _factory = {};

      _factory.fetchFile = function(file) {
        return $http.get('/api/resource?resource=' + encodeURIComponent(file));
      };

      return _factory;
    }
  ]);

  /*** http://stackoverflow.com/a/16721746/1015046 **/
  /** Simplified Singleton approach for playing the audio/video **/
  app.factory('audio', function($document) {
    var audioElement = $document[0].getElementById('audio');
    audioElement.autoPlay = true;

    return {
      audioElement: audioElement,

      play: function(filename) {
        audioElement.src = filename;
        audioElement.play();
      },
      resume: function() {
        audioElement.play();
      },
      pause: function() {
        audioElement.pause();
      },
      stop: function() {
        audioElement.pause();
        audioElement.src = audioElement.currentSrc; /** http://stackoverflow.com/a/16978083/1015046 **/
      },
      incVol: function() {
        if (audioElement.volume < 1) {
          audioElement.volume = (audioElement.volume + 0.1).toFixed(2);
        }
        return audioElement.volume;
      },
      decVol: function() {
        if (audioElement.volume > 0) {
          audioElement.volume = (audioElement.volume - 0.1).toFixed(2);
        }
        return audioElement.volume;
      },
      timer: function(callback) {
        audioElement.ontimeupdate = function() {
          callback(audioElement.duration, audioElement.currentTime)
        };
      },
    }
  });

  app.factory('video', function($document) {
    var videoElement = $document[0].getElementById('video');
    videoElement.autoPlay = true;

    return {
      videoElement: videoElement,

      play: function(filename) {
        videoElement.src = filename;
        videoElement.play();
      },
      resume: function() {
        videoElement.play();
      },
      pause: function() {
        videoElement.pause();
      },
      stop: function() {
        videoElement.pause();
        videoElement.src = videoElement.currentSrc; /** http://stackoverflow.com/a/16978083/1015046 **/
      },
      incVol: function() {
        if (videoElement.volume < 1) {
          videoElement.volume = (videoElement.volume + 0.1).toFixed(2);
        }
        return videoElement.volume;
      },
      decVol: function() {
        if (videoElement.volume > 0) {
          videoElement.volume = (videoElement.volume - 0.1).toFixed(2);
        }
        return videoElement.volume;
      },
      timer: function(callback) {
        videoElement.ontimeupdate = function() {
          callback(videoElement.duration, videoElement.currentTime)
        };
      },
    }
  });
