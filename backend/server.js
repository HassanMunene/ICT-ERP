const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes.js');
require('./connection');

// import the Server class from socket.io library
const {Server} = require('socket.io');
// create an instance of Socket io server by passing an
// instance of the http server instance
const io = new Server(server, {
    cors: '*',
    methods: '*'
})


app.get('/', (req, res) => {
    res.send('Hello mate');
})
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoutes);

server.listen(8081, () => {
    console.log('Server is running at port 8081');
})
