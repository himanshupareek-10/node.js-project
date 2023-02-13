require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

mongoose.connect(`mongodb://localhost:27017/node_project`);


const get_router = require("./routes/get-route");
const post_router = require("./routes/post-route");

app.use(express.json());
app.use('/get', get_router);
app.use('/post', post_router);

app.listen(3500, ()=>{
    console.log('Server started at port 3500')
});