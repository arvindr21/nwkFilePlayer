app.controller('HomeCtrl', ['$scope', 'FetchFileFactory', 'audio', 'video',
  function($scope, FetchFileFactory, audio, video) {
    $scope.fileViewer = 'Please select a file to view its contents';

    $scope.nodeSelected = function(e, data) {
      var _l = data.node.li_attr;

      // TODO : RESET states - Need to find a better way to handle this
      {
        $scope.audioPlayer = false;
        $scope.videoPlayer = false;
        $scope.imagePlayer = false;

        if ($scope.isAudioPlaying) {
          audio.stop();
          $scope.isAudioPlaying = false;
        }
        if ($scope.isVideoPlaying) {
          video.stop();
          $scope.isVideoPlaying = false;
        }
      }

      if (_l.isLeaf) {
        var uri = _l.base;
        /** http://stackoverflow.com/a/12900504/1015046  **/
        var ext = uri.substr((Math.max(0, uri.lastIndexOf(".")) || Infinity) + 1);
        if (ext.trim().length == 0) {
          $scope.$apply(function() {

            $scope.fileViewer = 'Hmmm.. Looks like this file cannot be played.';

          });
        } else if (ext == 'png' || ext == 'jpeg' || ext == 'jpg') {
          $scope.$apply(function() {

            $scope.imagePlayer = true;
            $scope.fileName = uri;
            $scope.imgSrc = '/api/resource?resource=' + uri;

          });
        } else if (ext == 'mp3') {
          $scope.$apply(function() {

            $scope.audioPlayer = true;
            $scope.fileName = uri;
            audio.play('/api/resource?resource=' + uri);
            $scope.isAudioPlaying = true;

          });
        } else if (ext == 'mp4') {
          $scope.$apply(function() {

            $scope.videoPlayer = true;
            $scope.fileName = uri;
            video.play('/api/resource?resource=' + uri);
            $scope.isVideoPlaying = true;

          });
        } else if (ext == 'txt' || ext == 'log' || ext == 'json' || ext == 'md') {
          FetchFileFactory.fetchFile(uri).then(function(data) {
            var _d = data.data;

            if (typeof _d == 'object') {
              /** http://stackoverflow.com/a/7220510/1015046 **/
              _d = JSON.stringify(_d, undefined, 2);
            }
            $scope.fileViewer = _d;
          });
        }
      } else {
        $scope.$apply(function() {

          $scope.fileViewer = 'Please select a file to view its contents';

        });
      }
    };
  }
]);
