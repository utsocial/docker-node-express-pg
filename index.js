var express = require('express');
var app = express();

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
	var appname =   "Boilerplate-dnepg V1.2 B.20170401 - Docker+node+express+ejs+pg ";
    var title = appname ;
    var pg = require('pg');
  	console.log("Start testing request / (nodemon index.js) 2017-abr-03 20:21 ...");
    client = new pg.Client('postgres://root:password@localhost:5432/testdb');
    console.log ('1.- Connection to Postgres testdb ...');	
	client.connect(function (err) {
      	if (err) throw err;	
	}); 	
	console.log ('2.- Creating table products ...');
	sqlcmd = `
			CREATE TABLE IF NOT EXISTS products 
			( product_no integer, 
    			name text, 
    			price numeric 
			);
		`;
	console.log(sqlcmd);
	client.query(sqlcmd, function (err) {
			if (err) throw err;
	});	
	console.log("3.- inserting data ...");
	sqlcmd =  ` 
		INSERT INTO products VALUES (
			1, 'Cheese', 98.76
		)`;  
    console.log("Exec:"+sqlcmd);
	client.query(sqlcmd);
	console.log('4.-Select Data');
	sqlcmd = `
		SELECT * FROM products
		`;	
	console.log("Exec:"+sqlcmd);
    client.query(sqlcmd, 
		function (err, res) {
     			if (err) throw err;
				console.log(JSON.stringify(res.rows, null, "    "));
     			var pgrows = res.rows;
				client.end(function (err) {
      				if (err) throw err;
      			}); // client.end
   	}); // client.query
	
     response.render('pages/index', {
        drinks: drink_list,
        tagline: title
    });

}); //end route 


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


