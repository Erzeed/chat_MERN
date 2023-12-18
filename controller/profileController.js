const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()
const jwtSecret = process.env.JWT_SECREET

router.get('/', (req,res) => {
    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        res.json(userData);
      });
    } else {
      res.status(401).json('no token');
    }
  });

module.exports = router