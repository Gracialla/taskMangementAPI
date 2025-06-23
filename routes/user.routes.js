const express = require("express");
const register = require("./controllers/register.js");
const login = require("./controllers/login.js");

const userRoutes = express.Router();

//Routes
userRoutes.post("/register", register);
userRoutes.post("/login", login);

module.exports = userRoutes;