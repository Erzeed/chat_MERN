const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config()
const jwtSecret = process.env.JWT_SECREET

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    const foundUser = await User.findOne({email});
    if (foundUser) {
        const passOk = bcryptjs.compareSync(password, foundUser.password);
        if (passOk) {
        jwt.sign({userId:foundUser._id,email}, jwtSecret, {}, (err, token) => {
            res.cookie('token', token, {sameSite:'none', secure:true}).json({
            id: foundUser._id,
            });
        });
        }
    }
})

module.exports = router