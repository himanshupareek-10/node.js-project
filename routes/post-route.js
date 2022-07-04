const express = require("express");
require("../config");
const PersonModel = require('../person');

const router = express.Router();

router.post("/", async (req, res)=>{
    try{
        let Person = new PersonModel(req.body);
        await Person.save();
        res.status(200).send(Person);
    } catch (error) {
        if(error.name === "ValoidationError"){
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send(errors);
        }
        res.status(500).send("Something went wrong!!!")
    }
})

module.exports = router;

