const path = require('path')
const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { errorHandler } = require('./middleware/errorMiddleware')
const { connectDB } = require('./config/db')

const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/employee', require('./routes/employeeRoutes'))
app.use('/api/resident', require('./routes/residentRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/message', require('./routes/conversationRoutes'))

app.use(errorHandler);

const server = http.createServer(app)
app.use(cors())
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
})

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('join', ({ senderInfo, roomId }, callback) => {
    const { firstName, lastName } = senderInfo
    console.log(firstName, lastName)
    socket.join(roomId)
    // socket.emit('message',
    //   {
    //     firstName: 'Chat',
    //     lastName: 'Bot',
    //     text: `${firstName} ${lastName}, welcome to the chat room!`,
    //     createdAt: new Date(),
    //     userId: '-100',
    //     roomId
    //   })
    // socket.broadcast.to(roomId).emit('message',
    //   {
    //     firstName: 'Chat',
    //     lastName: 'Bot',
    //     text: `${firstName} ${lastName}, has joined!`,
    //     createdAt: new Date(), userId: '-100'
    //   })
  })
  socket.on('sendMessage', (data, callback) => {
    const { text, roomId, name, createdAt, userId } = data
    io.to(roomId).emit('message', { name, text, createdAt, userId, roomId })
    callback()
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => console.log(`Server started on port ${port}`))