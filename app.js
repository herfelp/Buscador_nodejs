const express = require("express"),
      bodyParser = require('body-parser'),
      http       = require('http'),
      app = express(),
      port = process.env.PORT || 3000,
      Server     = http.createServer(app);




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))



app.get("/", (req,res) =>{
  console.log("recibido un método GET")
  res.end("Hola mundo")
})

app.listen(port, function(){
  console.log('Servidor corriendo en puerto: '+ port)
});
