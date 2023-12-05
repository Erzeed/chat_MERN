const regis = require("./controller/userController")

module.exports = (app) => {
    app.use("/register", regis);
}