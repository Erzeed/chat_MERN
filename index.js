const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express()
const dotenv = require("dotenv");
const router = require("./router");
const cors = require("cors")
const PORT = 3000;

dotenv.config()

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log('MongoDB Connection Succeeded.');
  })
  .catch((err) => {
    console.log('Error in DB connection: ' + err);
  });


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

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

