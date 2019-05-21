var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var onlineUsers = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/h1.html');
});

app.get ('/change', function (req, res) {
	let name = req.query.name;
	console.log (name + ' is on ...') 
	res.sendFile (__dirname + '/h1p.html');
});

io.on('connection', function(socket){  
  socket.on('login', function(name){
	onlineUsers++;
    io.emit('login', name, onlineUsers);
  });
  socket.on('disconnect', function () {
	onlineUsers--;
	io.sockets.emit('disconnect', onlineUsers);
  });
  socket.on('chat message', function(msg, name){
    io.emit('chat message', msg, name);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});