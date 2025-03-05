const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const customers = require('../commonData');

// 
router.post('/register', async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (customers.find(cust => cust.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    const customer = {
        id: customers.length + 1,
        name,
        email,
        password,
        address,
        preferences: []
    };

    customers.push(customer);

    const token = jwt.sign(
        { id: customer.id, email: customer.email, role: 'customer' },
        'dawoodSecret',
        { expiresIn: '24h' }
    );

    res.status(201).json({ token });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const customer = customers.find(cust => cust.email === email);

    if (!customer || !(await compare(password, customer.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: customer.id, email: customer.email, role: 'customer' },
        'dawoodSecret',
        { expiresIn: '24h' }
    );
    console.log(customer);

    res.json({ token });
});

// Get customer details
router.get('/:id', (req, res) => {
    const customer = customers.find(cust => cust.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    const { password, ...customerData } = customer;
    res.json(customerData);
});

// Update customer preferences
router.put('/:id/preferences', (req, res) => {
    const customer = customers.find(cust => cust.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    customer.preferences = req.body.preferences;
    res.json({ message: 'Preferences updated successfully' });
});

module.exports = router; 