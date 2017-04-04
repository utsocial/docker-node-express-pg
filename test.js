var pg = require('pg');
 
var client = new pg.Client('postgres://root:password@localhost:5432/testdb');
 
console.log("Start DB integration test node+pg...");  
// connect to our database 
client.connect(function (err) {
  if (err) throw err;
 
  // execute a query on our database 
  client.query('SELECT datname FROM pg_database WHERE datistemplate = false;', function (err, result) {
    if (err) throw err;
 
    // just print the result to the console 
    console.log(result.rows); 
 
    // disconnect the client 
    client.end(function (err) {
      if (err) throw err;
    });
  });
});
