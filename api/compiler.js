var CompilerPath = "g++";
var CodeFilePath = "code.cpp";
var ExePath = "prog";

var fs = require('fs'); 

var privateKey = require('./key');

module.exports.run = function(code, inputs, res) {
  const NodeRSA = require('node-rsa');
  const key = new NodeRSA(privateKey);

  key.setOptions({encryptionScheme: 'pkcs1'});
  
  code = key.decrypt(code, 'utf8');

  fs.writeFileSync(CodeFilePath, code);

  var spawn = require('child_process').spawn;
  var prc = spawn(CompilerPath,  [CodeFilePath, '-o', ExePath]);

  var errors = [];

  prc.stderr.setEncoding('utf8');
  prc.stderr.on('data', function (data) {
    var str = data.toString()
    var lines = str.split(/(\r?\n)/g);
    errors.push(lines.join(""));
  });

  prc.on('close', function (code) {
    if (code != 0) {
      res.send({
        success: false,
        errors: errors.join("\n"),
        title: "Compilation Error"
      });

      return;
    }

    errors = [];
    var outputs = [];

    var prx = spawn('./' + ExePath);

    prx.stdout.setEncoding('utf8');
    prx.stdout.on('data', function (data) {
      var str = data.toString()
      var lines = str.split(/(\r?\n)/g);
      outputs.push(lines.join(""));
    });

    prx.stderr.setEncoding('utf8');
    prx.stderr.on('data', function (data) {
      var str = data.toString()
      var lines = str.split(/(\r?\n)/g);
      errors.push(lines.join(""));
    });

    prx.stdin.write(inputs + "\n");

    prx.on('close', function (code) {
      if (code != 0) {
        res.send({
          success: false,
          errors: errors.join("\n"),
          title: "Runtime Error"
        });
  
        return;
      }

      res.send({
        success: true,
        output: outputs.join("\n"),
        title: "Success"
      });
    });
  });
}
