const express = require('express');
const routes = require('./customerRoutes');
const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/api/customers', routes);

app.listen(PORT, () => {
    console.log(`Customer microservice is running on port ${PORT}`);
}); 