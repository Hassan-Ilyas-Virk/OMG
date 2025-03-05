const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const restaurants = require('../commonData');

// A middleware function for verifying the JWT token 
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token.split(' ')[1], 'dawoodSecret');
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// A Route for Adding a new restaurant - It is for Admin Only
router.post('/', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access is required' });
    }

    const { name, location, menu } = req.body;

    const restaurant = {
        id: restaurants.length + 1,
        name,
        location,
        menu,
        isAvailable: true
    };

    restaurants.push(restaurant);
    res.status(201).json(restaurant);
});

// A route for getting the list of all restaurants - for customers 
router.get('/', (req, res) => {
    res.json(restaurants.filter(rest => rest.isAvailable == true));
});

// A route for getting the information of the restaurant by ID - for customers
router.get('/:id', (req, res) => {
    const restaurant = restaurants.find(rest => rest.id === parseInt(req.params.id) && rest.isAvailable == true);

    if (!restaurant) {
        return res.status(404).json({
            error: 'Restaurant not found'
        });
    }
    res.json(restaurant);
});

module.exports = router;

