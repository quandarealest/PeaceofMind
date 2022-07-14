const path = require('path')
const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { errorHandler } = require('./middleware/errorMiddleware')
const { connectDB } = require('./config/db')
const port = process.env.PORT || 3000

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
  }
})

server.listen(port, () => console.log(`Server started on port ${port}`))