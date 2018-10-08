var express    = require('express');        // call express
var app        = express();                 // define our app using express
var fs= require("fs");


app.get('/users', function (req, res) {
    fs.readFile(__dirname + "/app/models/" + "users.json", 'utf8', function (err, data) {
       //console.log( data );
       var users=JSON.parse( data );
       //console.log("query params:"+req.query.from+req.query.size);
       pagination(users,req.query.from,req.query.size);
       res.end( data );
   });
})

app.get('/users/:id', function(req, res){
    fs.readFile(__dirname + "/app/models/" + "users.json", 'utf8', function (err, data) {
       
       var users=JSON.parse( data );
       var user= users["user"+ req.params.id];
       console.log( user );
       res.end(JSON.stringify(user));

   });
})
var port = process.env.PORT || 8081;        // set our port

function pagination(users,from,size){
    
        var myArray = [];
        var i=parseInt(from)+1;
        var size=i+parseInt(size);
        console.log(size);
        //myArray.length = 10;
       while(i<size){
        myArray.push(users["user"+i]);
        i++;
       }
       console.log(myArray);

}



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
