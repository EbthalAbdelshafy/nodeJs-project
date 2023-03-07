const validation = require("../../../common/middleware/validation");
const { signUp, signIn } = require("../controller/userController");
const {signUpSchema} = require("../joi/userJoi");
const {ADD_ADMIN}= require("../endPoints/userEndPoints");
const router = require("express").Router();
const isAuth =require("../../../common/middleware/isAuth")


router.post("/singUp",isAuth(ADD_ADMIN),validation(signUpSchema),signUp);
router.post("/logIn",signIn)
module.exports = router ;