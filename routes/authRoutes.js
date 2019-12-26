const router = require("express").Router();
const User = require('../models/User');
const signupValidator = require("../validator/signupValidator");
const loginValidator = require("../validator/loginValidator");
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
  changePasswordGetController,
  changePasswordPostController

} = require("../controllers/authController");

const {isUnauthenticted, isAuthenticated } = require('../middlewares/authMiddlewares');


router.get("/signup",isUnauthenticted, signupGetController);
router.post("/signup", isUnauthenticted, signupValidator, signupPostController);

router.get("/login", isUnauthenticted,loginGetController);
router.post("/login", isUnauthenticted, loginValidator, loginPostController);

router.get("/change-password", isAuthenticated,changePasswordGetController);
router.post("/change-password", isAuthenticated,changePasswordPostController);

router.get("/logout", logoutController);

module.exports = router;
