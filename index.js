/**
 * Created by mac on 2015. 12. 15..
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var idManager = require("./idManager");

console.log(idManager);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/remote.html');
});
app.get('/view', function(req, res){
    res.sendFile(__dirname + '/view.html');
});
app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/chatClient.html');
});
app.get('/msg', function(req, res){
    res.sendFile(__dirname + '/message/msg.html');
});

var allUsers = {};

io.on('connection', function(socket){
    console.log('a user connected');
    //console.log(io.sockets.sockets.length);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on("msg",function(data){
        console.log(data);
        io.emit("smsg", data);
    });

    socket.on("secretMsg", function (data) {

        if(allUsers[data.to]){
            allUsers[data.to].emit("secretBox", data);
            allUsers[data.from].emit("mymsg", data);
        }

    });

    socket.on('message', function(msg){

        console.log('message: ' + msg)

    });

    socket.on("uri", function(data){
        console.log(data);
        if(allUsers[data.to]){
            allUsers[data.to].emit("uri", data);
        }
    });

    socket.on("reset", function(data){
        console.log(data);
        if(allUsers[data.to]){
            allUsers[data.to].emit("reset", data);
        }
    });

    socket.on("login", function(data){
       console.log(data);
       idManager.checkid(data, function(err,rows){
          console.log(rows);
          if(rows.length ==1){
              socket.uid = data.uid;
              allUsers[data.uid] = socket;

              console.log(allUsers);

              socket.emit("loginResult",{result:"SUCCESS"});
              io.emit("newUser", data.uid);
          }else{
              socket.emit("loginResult",{result:"FAIL"});
          }
       });
    });

});


http.listen(3003, function(){
    console.log('listening on *:3003');
});