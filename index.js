const express = require("express");

const app = express();

const get_router = require("./routes/get-route");
const post_router = require("./routes/post-route");

app.use(express.json());
app.use('/get', get_router);
app.use('/post', post_router);

app.listen(3500, ()=>{
    console.log('Server started at port 3500')
});