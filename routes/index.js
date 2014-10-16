var fs = require('fs');
var path = require('path');

exports.index = function(req, res) {
  res.render('index');
};

exports.tree = function(req, res) {
  var _p;
  if (req.query.id == 1) {
    _p = path.resolve('/');
    processReq(_p, res);

  } else {
    if (req.query.id) {
      _p = req.query.id;
      processReq(_p, res);
    } else {
      res.json(['No valid data found']);
    }
  }
}

exports.resource = function(req, res) {
  var s = fs.statSync(req.query.resource);
  /** http://stackoverflow.com/a/12900504/1015046  **/
  var ext = req.query.resource.substr((Math.max(0, req.query.resource.lastIndexOf(".")) || Infinity) + 1);


  if (ext == 'mp3') {
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': s.size
    });
    var readStream = fs.createReadStream(req.query.resource);
    readStream.pipe(res);

  } else if (ext == 'mp4') {
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Length': s.size
    });
    var readStream = fs.createReadStream(req.query.resource);
    readStream.pipe(res);
  } else if (ext == 'txt' || ext == 'log' || ext == 'json' || ext == 'md') {
    res.send(fs.readFileSync(req.query.resource, 'UTF-8'));
  } else if (ext == 'png' || ext == 'jpeg' || ext == 'jpg') {
    res.end(fs.readFileSync(req.query.resource), 'binary');
  } else {
    res.send('Hmmm.. Looks like this file cannot be played.');
  }
}

function processReq(_p, res) {
  var resp = [];
  fs.readdir(_p, function(err, list) {
    for (var i = list.length - 1; i >= 0; i--) {
      resp.push(processNode(_p, list[i]));
    }
    res.json(resp);
  });
}

function processNode(_p, f) {
  var s = fs.statSync(path.join(_p, f));
  return {
    "id": path.join(_p, f),
    "text": f,
    "icon": s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
    "state": {
      "opened": false,
      "disabled": false,
      "selected": false
    },
    "li_attr": {
      "base": path.join(_p, f),
      "isLeaf": !s.isDirectory()
    },
    "children": s.isDirectory()
  };
}
