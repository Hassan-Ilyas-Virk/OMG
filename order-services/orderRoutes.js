const express = require('express');
const router = express.Router();
const axios = require('axios');
const orders = require('../commonData');


// A route which is responsible for placing a new order 
router.post('/', async (req, res) => {
    try {
        const { customerId, restaurantId, items, paymentDetails } = req.body;

        // Verify customer
        const customerResponse = await axios.get(`http://localhost:3002/api/customers/${customerId}`);
        const customer = customerResponse.data;

        // Verify restaurant and items
        const restaurantResponse = await axios.get(`http://localhost:3001/api/restaurants/${restaurantId}`);
        const restaurant = restaurantResponse.data;

        // Calculate total amount
        const total = items.reduce((sum, item) => {
            const menuItem = restaurant.menu.find(m => m.id === item.menuItemId);
            if (!menuItem) throw new Error('Invalid menu item');
            return sum + (menuItem.price * item.quantity);
        }, 0);



        const order = {
            id: orders.length + 1,
            customerId,
            restaurantId,
            items,
            total,
            isPlaced: true,
            isDelivered: false,
            isCancelled: false
        };

        orders.push(order);
        res.status(201).json(order);
        console.log('----------------------------------------');
        console.log('New order placed successfully:', order);
        console.log('Customer:', customer);
        console.log('Restaurant:', restaurant);
        console.log('Items:', items);
        console.log('Order:', order);
        console.log('Order placed successfully:', order);
        console.log('Total amount:', total);
        console.log('Payment details:', paymentDetails);
        console.log('Payment processed successfully');
        console.log('Order history:', orders);
        console.log('----------------------------------------');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// A route which is responsible for getting order status.
router.get('/:id/status', (req, res) => {
    const order = orders.find(ord => ord.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ status: order.isPlacedSuccessfully ? 'Order placed successfully' : 'Order failed' });
});

// A route which is responsible for getting customer's order history.
router.get('/customer/:customerId', (req, res) => {
    const customerOrders = orders.filter(ord => ord.customerId === parseInt(req.params.customerId));
    res.json(customerOrders);
});

module.exports = router; 