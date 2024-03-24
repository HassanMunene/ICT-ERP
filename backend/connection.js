require('dotenv').config();

const mongoose = require('mongoose');

const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.2lrconm.mongodb.net/kcaMarket?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log("Error connecting to MongoDB: ", error))

mongoose.connection.on('error', (err) => console.log(err));
