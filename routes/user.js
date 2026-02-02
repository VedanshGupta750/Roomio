const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport")

router.get('/signup', (req, res) => {
    res.render("users/signup.ejs")
})

router.post('/signup', async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            } else {
                req.flash("success", "Welcome to Roomio");
                res.redirect('/listings');
            }
        })

    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect('/signup');
    }

});

router.get('/login', (req, res) => {
    res.render("users/login.ejs");
});

router.post('/login', passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    req.flash("success", "Welcome to Roomio, You are logged in!");
    res.redirect("/listings");
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect('/listings');
    })
})

module.exports = router;