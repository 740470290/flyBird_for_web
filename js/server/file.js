const http = require('http');
const fs = require('fs');

http.createServer(function(req,res){
  fs.readFile('1.jpg',function(err,data){
    
    res.end(data);
  })


}).listen(4002);