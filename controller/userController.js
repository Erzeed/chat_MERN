const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const jwtSecret = process.env.JWT_SECREET

router.post("/register", async (req,res) => {
    try {
        const {username, password} = req.body
        const createUser = await User.create(username, password)
        jwt.sign({userId: createUser, id}, jwtSecret, (err, res) => {
            if (err) throw err
            res.cookie("token", token).status(201).json("ok")
        })
    } catch (error) {
        res.status(400).send("gagal")
    }
})

module.exports = router