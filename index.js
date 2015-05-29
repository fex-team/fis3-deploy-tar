
var archiver = require('archiver');
var concatStream = require('concat-stream');

module.exports = function(options, modified, total, callback) {
  var list = options.modified ? modified : total;

  if (!list.length) {
    return false;
  }

  var filename = options.filename || 'all.tar.gz';
  var root = fis.project.getProjectPath();
  var tarfile = archiver('tar', {
    gzip: /\.tar\.gz$/i.test(filename)
  });

  list.forEach(function(file) {
    var filepath = file.getHashRelease().substring(1);

    tarfile.append(file.getContent(), {
      name: filepath,
      mode: null
    });
  });

  tarfile.finalize();

  tarfile.pipe(concatStream(function(data) {
    var file = fis.file(root, filename);
    file.setContent(data);

    if (!options.keep) {
      modified.splice(0, modified.length);
      total.splice(0, total.length);
    }

    modified.push(file);
    total.push(file);
    callback();
  }))
};

module.exports.options = {
  // 是否保留原始文件。
  keep: false,

  // 是否只打包修改过的。
  modified: false,

  // zip 文件名
  filename: 'all.tar.gz'
};
