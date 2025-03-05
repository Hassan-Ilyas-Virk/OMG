const express = require('express');
const routes = require('./orderRoutes');
const app = express();
const PORT = 3003;

app.use(express.json());
app.use('/api/orders', routes);

app.listen(PORT, () => {
    console.log(`Order microservice is running on port ${PORT}`);
}); 