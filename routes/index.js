//import express
const express = require("express");

//init express router
const router = express.Router();

//import verifyToken
const verifyToken = require("../middleware/auth");

//import validate validator
const { validateRegister, validateLogin } = require("../utils/validators/auth");

const { validateUser } = require("../utils/validators/user");

//import the controller
const registerController = require("../controllers/RegisterController");
const loginController = require("../controllers/LoginController");
const userController = require("../controllers/UserController");

//define route
router.post("/register", validateRegister, registerController.register);
router.post("/login", validateLogin, loginController.login);
router.post("/login_mock", validateLogin, loginController.loginMock);
router.get("/admin/users", verifyToken, userController.findUsers);
router.get(
  "/admin/users/:id",
  verifyToken,
  validateUser,
  userController.findUserById
);
router.post(
  "/admin/users",
  verifyToken,
  validateUser,
  userController.createUser
);
router.put(
  "/admin/users/:id",
  verifyToken,
  validateUser,
  userController.updateUser
);
router.delete("/admin/users/:id", verifyToken, userController.deleteUser);

//export router
module.exports = router;
