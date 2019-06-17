const http = require('http');

http.createServer(function(req,res){
  console.log(req.url);
  res.end('This is Server');
}).listen(4000);


