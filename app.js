const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/Desktop.html' );
});

app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/Mobile.html' );
});

//socket.io stuff
//https://socket.io/docs/v3/emit-cheatsheet/
io.on('connection', (socket) => {
    console.log( socket.id + " connected" );


    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("red", (data) => {
        io.emit("move_box");
    });
    
    socket.on("blue", (data) => {
        io.emit("box_move");
    });

    socket.on("painting", (data) => {
        console.log("Painting Item: ", data.id);
        io.emit("paint_change", { id: data.id, r:0, g:255, b:0});
    });

});

app.use(express.static(__dirname + '/public')); //set root path of server ...
server.listen(LISTEN_PORT);
console.log("Listening on port: " + LISTEN_PORT );