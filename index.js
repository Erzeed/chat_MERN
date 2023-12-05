const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./router");

dotenv.config()

mongoose.connect(process.env.MONGOOSE_URL)

const app = express()

//tampilan basehome
app.get('/', (req, res) => {
    res.send({
        status:200,
        results:'haii -_-'
    });
});

router(app)


const port = 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

