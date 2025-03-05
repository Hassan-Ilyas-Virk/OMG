const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dawoodSecret';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SCD-LAB-1');

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);

// Register and login routes
app.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = new User({ email, password, role });

        await user.save();
        console.log(user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials or No Such User Exists' });
        }

        const validPassword = await compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
        console.log(token);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Authentication and Authorization microservices are running on port ${PORT}`);
}); 