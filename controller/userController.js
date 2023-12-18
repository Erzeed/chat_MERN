const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config()
const jwtSecret = process.env.JWT_SECREET
const bcryptSalt = bcryptjs.genSaltSync(10);

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPass = bcryptjs.hashSync(password, bcryptSalt);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "Email already exists" });
        }

        const createdUser = await User.create({ 
            username, 
            email, 
            password: hashedPass,
         });

        // Check if the user creation was successful
        if (!createdUser) {
            // If not successful, throw an error
            throw new Error({ message: "User created failed" });
        }

        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'None', secure: true }).status(201).json({
                id: createdUser._id
            });
        });
    } catch (error) {
        console.error(error); // Log the error to the console for debugging
        res.status(500).send({ message : " Somethin wrong"});
    }
});


module.exports = router