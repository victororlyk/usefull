// add validation before heating the route with 
const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../models/user");
const router = express.Router();

router.post("/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom((value, { req }) => {
        return User.findOne({ email: value })
                   .then(user => {
                     if (user) {
                       return Promise.reject("This email address is already taken");
                     }
                   });
      }),
    body("password", "please enter a valida email")
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password must match");
        }
        return true;
      })
  ],
  authController.postSignup);
