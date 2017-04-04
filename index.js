var express = require('express');
var app = express();
//-// poc pg


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    var drink_list = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Ivan Chenoweth 20170401-17:39 Docker+node+express+ejs+pg";
    var pgrows={};
    var pg = require('pg'); 
      client = new pg.Client('postgres://root:password@localhost:5432/testdb');
      console.log("Start testing (nodemon index.js) 22:59...");
      // connect to our database
      client.connect(function (err) {
      	if (err) throw err;
      	client.query('SELECT datname FROM pg_database WHERE datistemplate = false;', 
		function (err, result) {
     		if (err) throw err;
      		//console.log(result.rows);
	
 	client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
	/*
	client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald'] ,

		function (err, result) {
     		if (err) throw err;
		}
	
	);
	/*
 	client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);
	var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
	query.on("row", function (row, result) {
    		result.addRow(row);
	});
	query.on("end", function (result) {
    		console.log(JSON.stringify(result.rows, null, "    "));
    		client.end();
	});
	*/
     	 	client.end(function (err) {
      			if (err) throw err;
      			pgrows=result.rows;
      			console.log(pgrows);
      		}); // client.end
    	}); // client.query
	});

    response.render('pages/index', {
        drinks: drink_list,
        tagline: tagline,
        dbrows: pgrows
    });

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


