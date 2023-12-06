const register = require("./controller/userController")


module.exports = (app) => {
    app.use("/register", register);
}