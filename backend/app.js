const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection esatablised successfully");
})

autoIncrement.initialize(connection);

const orderRouter = require('./routes/orders');

app.use('/orders', orderRouter);

app.listen(port, () => {
    console.log(`Sever is running on port: ${port}`)
})