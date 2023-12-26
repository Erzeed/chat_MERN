const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const router = require("./router");
const cors = require("cors")
const ws = require("ws");
const jwt = require("jsonwebtoken");
const MessageModel = require("./models/message");

dotenv.config()
const PORT = 3000;
const app = express();
const jwtSecret = process.env.JWT_SECREET;

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


const server = app.listen(PORT, () => {
  console.log("server connected")
});
const wss = new ws.WebSocketServer({ server })
wss.on('connection', (connection, req) => {
  // read username and id form the cookie for this connection
  const cookies = req.headers.cookie;
  if(cookies) {
    const tokenCookie = cookies.split(';').find(str => str.startsWith('token='));
    if(tokenCookie) {
      const token = tokenCookie.split('=')[1];
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err;
          const {userId, email} = userData;
          connection.userId = userId;
          connection.email = email;
        });
      }
    }
  }

  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString());
    console.log(messageData)
    const {recipient, text} = messageData;

    if (recipient && text) {
      const messageDoc = await MessageModel.create({
        sender:connection.userId,
        recipient,
        text
      });
      [...wss.clients]
        .filter(c => c.userId === recipient)
        .forEach(c => c.send(JSON.stringify({
          text,
          sender:connection.userId,
          recipient,
          _id:messageDoc._id,
        })));
    }
  });

  [...wss.clients].forEach(client => {
    client.send(JSON.stringify({
      online: [...wss.clients].map(c => ({userId:c.userId,email:c.email})),
    }));
  });
});
