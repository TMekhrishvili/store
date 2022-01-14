const express = require('express');
const app = express();
const connectDB = require('./db');
const notFound = require('./middlewares/not-found');
const errorsHandler = require('./middlewares/errors-handler');
const productsRoutes = require('./routes/products');
require('dotenv').config();
require('express-async-errors');

// middlewares
app.use(express.json());
app.use(errorsHandler);

// routes
app.use('/api/v1/products', productsRoutes);

// middlewares
app.use(notFound);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();