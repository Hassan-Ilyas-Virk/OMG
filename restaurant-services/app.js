const express = require('express');
const routes = require('./restaurantRoutes');
const app = express();
const PORT = 3007;

app.use(express.json());
app.use('/api/restaurants', routes);

app.listen(PORT, () => {
    console.log(`Restaurant microservice is running on port ${PORT}`);
}); 