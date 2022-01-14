const express = require('express');
const app = express();
const connectDB = require('./db');
const notFound = require('./middlewares/notFound');

require('dotenv').config();


// routes
app.get('/', (req, res) => {
    res.send('test');
});


// middleware
app.use(express.json());
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