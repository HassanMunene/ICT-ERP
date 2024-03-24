const router = require('express').Router();
const User = require('../models/User');

//signup route
router.post('/signup', async(req, res) => {
    const {name, email, password} = req.body;

    try{
        const user = await User.create({name, email, password});
        res.json(user);
    } catch(error) {
        if(error.code === 11000) return res.status(400).send('Email already exists');
        res.status(400).send(error.message);
    }
})

// login route
router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        res.json(user);
    } catch(error) {
        res.status(400).send(error.message);
    }
})

// retrieve the users when we navigate to the home page together with their orders
/*router.get('/', async(req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders');
    } catch (error) {
        res.status(400).send(error.message);
    }
})*/
