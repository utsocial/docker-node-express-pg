var express = require('express');
var app = express();
//-// poc pg

var pg = require('pg'); 
client = new pg.Client('postgres://root:password@localhost:5432/testdb');
console.log("Start testing (index.js)...");
// connect to our database
client.connect(function (err) {
  if (err) throw err;
  client.query('SELECT datname FROM pg_database WHERE datistemplate = false;', function (err, result) {
    if (err) throw err;
    console.log(result.rows);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


