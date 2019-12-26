const { body } = require("express-validator");
const validator = require("validator");

const urlValidator = value => {
  if (value) {
    if (!validator.isURL(value)) {
      throw new Error("Please Enter Correct URL");
    }
   
  }
  return true;
};

module.exports = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title can not be empty")
    .isLength({ max: 15 })
    .withMessage("Title can not be 15 characeters long ")
    .trim(),
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can not be empty")
    .isLength({ max: 15 })
    .withMessage("Name can not be 15 characeters long ")
    .trim(),
  body("bio")
    .not()
    .isEmpty()
    .withMessage("Bio can not be empty")
    .isLength({ max: 100 })
    .withMessage("Bio can not be 100 characeters long ")
    .trim(),
  body("website").custom(urlValidator),
  body("facebook").custom(urlValidator),
  body("twitter").custom(urlValidator),
  body("github").custom(urlValidator)
];
