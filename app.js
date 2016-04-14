var http = require('http');
var fs = require('fs');
var path = require('path');

var multiparty = require('multiparty');
var form = new multiparty.Form();

//load the html file and pass it to the http server
var indexFilePath = path.normalize(path.join(__dirname + '/index.html'));
fs.readFile(indexFilePath, function(err, html) {
  startSerer(html);
});


function startSerer(html) {

  var server = http.createServer(function(req, res) {
    var url = req.url;
    //console.log(url);

    if (req.method == 'GET') {

      //nothing should be done when the favicon is requested
      if (req.url == '/favicon.ico') {
        res.end();
        return;
      }

      res.writeHead('200', {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    }


    if (req.method == "POST" && url == '/upload') {

      form.parse(req, function(err, fields, files) {

        //field conatining the file is called myFile
        if (files) {
          returnSize(req, res, files.myFile[0].size.toString());
        } else {
          returnSize(req, res, "Error. Please refresh the page.")
        }

      });

    }
  });


  var portNumber = process.env.PORT || 3000;
  server.listen(portNumber);
  console.log('Connected on port number ' + portNumber);
}


function returnSize(req, res, data) {

  var output = { "fileSize": data };
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify(output));
  res.end();
}
