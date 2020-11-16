const { check, body } = require("express-validator/check");

router.post("/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email adress")
      // to store normalized email
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .isAlphanumeric()
      // to remove all whitespsaces
      .trim()
  ],
  authController.postLogin);
