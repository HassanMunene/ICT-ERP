const router = require('express').Router();
const User = require('../models/User');
const Order = require('../models/Order');

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
        const user = await User.findUserByCredentials(email, password);
        res.json(user);
    } catch(error) {
        res.status(400).send(error.message);
    }
})

// retrieve the users when we navigate to the home page together with their orders users that
// are not admins
router.get('/', async(req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// get user orders:
router.get('/:id/orders', async (req, res)=> {
    const {id} = req.params;

    try {
        const user = await User.findById(id).populate('orders');
        res.json(user.orders);
    } catch (error) {
        console.log('error retrieving users orders in user route:', error);
        res.status(400).send(error.message);
    }
})
module.exports = router;
