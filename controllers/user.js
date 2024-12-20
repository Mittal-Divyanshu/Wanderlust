const User=require("../models/user.js");

module.exports.renderSignUpPage = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.postSignUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginPage=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.postLogin=async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.renderLogoutPage=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out");
        res.redirect("/listings");
    })
};