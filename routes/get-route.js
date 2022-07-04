const express = require("express");
require("../config");
const PersonModel = require('../person');

const router = express.Router();

router.get("/", async (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    let data = await PersonModel.find();
    res.send(data);
})

module.exports = router;