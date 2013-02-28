var express = require('express');
var app = express();

app.configure(function(){
    app.set('views', __dirname + '/app');
});

app.use("/app", express.static(__dirname + '/app'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/test", express.static(__dirname + '/appSpec'));

app.get('/', function(req, res){
  res.render('index.jade');
});

app.get('/get_data', function(req, res){
  var data = {name: 'John', surname: 'Connor'};
  res.send(JSON.stringify(data));
});

console.log('Server running on port 3000');
app.listen(3000);
