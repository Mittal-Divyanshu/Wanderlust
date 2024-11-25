const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/user.js");

router.get("/signup",(userController.renderSignUpPage))

router.post("/signup", wrapAsync(userController.postSignUp));

router.get("/login",userController.renderLoginPage);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.postLogin);

router.get("/logout",userController.renderLogoutPage);

module.exports=router;