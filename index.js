const { response } = require("express");
const express = require("express");
const connection = require("./config");

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    connection.then(people=>people.find().toArray())
    .then(data=>res.send(data));
})

app.post("/", (req, res)=>{
    connection.then(people=>people.insertMany(req.body))
    .then(result=>{
        if(result.acknowledged){
            res.send("Data is inserted");
        }else{
            res.send("Data is not inserted");
        }
    });
})

app.listen(3500);