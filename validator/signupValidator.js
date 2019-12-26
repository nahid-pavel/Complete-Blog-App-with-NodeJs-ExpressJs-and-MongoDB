const { body } = require("express-validator");
const User = require("../models/User");

module.exports = [
    body('username')
      .isLength({ max: 15, min: 5 })
      .withMessage("Username must be between 5 to 15 chars long")
      .custom(async username => {
        let user = await User.findOne({ username });
        if (user) {
          return Promise.reject("Username already in use");
        }
        return true;
      })
      .trim(),
    body("email")
      .isEmail().withMessage('Please provide a valid email address')
      .custom(async email => {
        let userEmail= await User.findOne({ email });
        if (userEmail) {
          return Promise.reject("Email already in use");
        }
        return true;
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be minimum 5 characters long"),
    body("password_confirm").custom(async (password,{req }) => {
      if (password !== req.body.password) {
        throw new Error(`Password doesn't match`);
      }
      return true;
    })
  ]