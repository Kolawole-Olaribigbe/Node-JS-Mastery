const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
//const PORT = process.env.PORT

//initiate socket.io and attach it to the http server
const io = socketIo(server)

app.use(express.static('public'));

const users = new Set();

io.on("connection", (socket)=>{
    console.log('User is now connected');
    //Handles users when they join the chat
    socket.on('join', (userName) => {
        users.add(userName);
        socket.userName = userName;
        //Broadcast to all users that a new user has joined
        io.emit('userJoined', userName);
        //Send updated user list to all clients
        io.emit('userList', Array.from(users));
    });
    
    //Handles incoming chat messages
    socket.on('chatMessage', (message) => {
        //broadcast received message to all connected clients
        io.emit("chatMessage", message);
    })
    
    //Handles user disconnection
    socket.on("disconnect", () => {
        console.log('A user disconnected');

        users.forEach(user => {
            if (user === socket.userName) {
                users.delete(user);
                io.emit('userLeft', user);

                io.emit('userList', Array.from(users));
            }
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
});

