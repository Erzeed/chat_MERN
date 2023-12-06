const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const jwtSecret = process.env.JWT_SECREET

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const createdUser = await User.create({ username, email, password });
        console.log(createdUser);

        // Check if the user creation was successful
        if (!createdUser) {
            // If not successful, throw an error
            throw new Error("User creation failed");
        }

        jwt.sign({ userId: createUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).status(201).json("ok");
        });
    } catch (error) {
        console.error(error); // Log the error to the console for debugging
        res.status(500).send("gagal");
    }
});


module.exports = router