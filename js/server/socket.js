const webSocket = require('ws');

const socket = new webSocket.Server({
  port:4001
});

socket.on('connection',function(ws){
  ws.on('message',function(message){
    console.log(message);
  });
  ws.send('服务器收到数据了');
})