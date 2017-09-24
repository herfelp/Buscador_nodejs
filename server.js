const express = require("express"),
  jsonfile = require("jsonfile"),
  http = require('http'),
  app = express(),
  port = process.env.PORT || 3000,
  Server = http.createServer(app);

app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/img'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
  });

  var fileName = __dirname + '/public/data/data.json'
  var file = jsonfile.readFileSync(fileName);


app.get("/buscar", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
    res.send(file);
  });


app.listen(port, function() {
  console.log('Servidor corriendo en puerto: ' + port)
});
