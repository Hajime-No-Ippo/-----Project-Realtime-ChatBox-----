const io = require('socket.io')(3000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const users = {}
 
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]})
  })  

    socket.on('disconnected', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    if (name) socket.broadcast.emit('user-disconnected', name)
    delete users[socket.id]
  })  
})