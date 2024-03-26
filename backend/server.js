const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const User = require('./models/User');

require('./connection');

// import the Server class from socket.io library
const {Server} = require('socket.io');
// create an instance of Socket io server by passing an
// instance of the http server instance
const io = new Server(server, {
    cors: '*',
    methods: '*'
})

const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes');
const imageRoutes = require('./routes/imageRoutes');


app.get('/', (req, res) => {
    res.send('Hello mate');
})
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/images', imageRoutes);

server.listen(8081, () => {
    console.log('Server is running at port 8081');
})
