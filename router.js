const register = require("./controller/userController");
const profile = require("./controller/profileController");
const login = require("./controller/loginController");

module.exports = (app) => {
    app.use("/register", register);
    app.use("/profile", profile);
    app.use("/login", login);
}