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
const orderRoutes = require('./routes/orderRoutes');


app.get('/', (req, res) => {
    res.send('Hello mate');
})
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/images', imageRoutes);
app.use('/orders', orderRoutes);

app.post('/create-payment', async(req, res)=> {
  const {amount, email} = req.body;
  console.log(amount, email);
  try {
    res.status(200).json("success");
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})


server.listen(8081, () => {
    console.log('Server is running at port 8081');
})
