/**
 * Created by jesse on 26/01/2016.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index2.html');
});

app.get('/view', function(req, res){
    res.sendFile(__dirname + '/index3.html');
});

io.on('connection', function(socket){

    console.log('a user connected');

    console.log(socket+'who');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('uri', function(msg){

        socket.broadcast.emit('uri', msg);
        console.log('uri: ' + msg);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});