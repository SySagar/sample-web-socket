const express = require('express')
const socket = require('socket.io')

const app = express();

const server = app.listen(process.env.PORT || 3000 || 4000, ()=>{
    console.log("listening to requests");
})

//static files
app.use(express.static('public'))

const io = socket(server)

io.on('connection', (socket) => {
    console.log('a user connected ',socket.id);

      // Handle chat event
      socket.on('chat', (data)=>{
        // console.log(data);
        io.sockets.emit('chat', data);
    });

     // Handle typing event
     socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected ',socket.id);
    });
  });