const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');

//creating an order
/*
 * once we create an order we want to send a notification to the admin by accessing
 * the io instance we set in the entry file
 * the send the message to the admin
 */
router.post('/', async(req, res)=> {
    const io = req.app.get('socketio');
    const {userId, cart, county, constituency, localArea} = req.body;
    console.log(req.body);

    try {
        const user = await User.findById(userId);
        const orderCount = cart.count;
        const orderTotal = cart.total;
        const order = await Order.create({
            owner: user._id,
            products: cart,
            county: county,
            constituency: constituency,
            localArea: localArea
        });
        order.count = orderCount;
        order.total = orderTotal;
        await order.save();
        user.cart =  {total: 0, count: 0};
        user.orders.push(order);
        /*emit an event */
        const notification = {status: 'unread', message: `New order from ${user.name}`, time: new Date()};
        io.sockets.emit('newOrder', notification);

        user.markModified('orders');
        await user.save();
        res.status(200).json(user)
    } catch (e) {
        console.log("error creating the order:", e);
        res.status(400).json(e.message)
    }
})

// getting all the orders
router.get('/', async(req, res)=> {
    try {
        const orders = await Order.find().populate('owner', ['email', 'name']);
        res.status(200).json(orders);
    } catch (e) {
        console.log("error retrieving the orders:", error);
        res.status(400).json(e.message)
    }
})

// mark order as delivered
router.patch('/:id/mark-delivered', async(req, res)=> {
    const io = req.app.get('socketio');
    const {ownerId} = req.body;
    const {id} = req.params;

    try {
        const user = await User.findById(ownerId);
        await Order.findByIdAndUpdate(id, {status: 'delivered'});
        const orders = await Order.find().populate('owner', ['email', 'name']);
        const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
        io.socket.emit("notification", notification, ownerId);
        user.notifications.push(notification);
        await user.save();
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e.message);
    }
})

module.exports = router;
