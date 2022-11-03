// @ts-nocheck
const express = require("express");
const router = express.Router();
const fs = require('fs');

var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/login", (req, res) => {
    let message = req.query.message;
    let messageType = req.query.type;
    res.render("panel/login",{
        message: message,
        type: messageType
    });
});

router.post("/login", async(req, res) => {
    let obj = JSON.parse(JSON.stringify(req.body));

    if(obj.username == process.env.AdminUser && obj.password == process.env.AdminPassword) {
        return res.cookie('auth', obj.password, { maxAge: 600000 * 3 }).redirect("/");
    }
    return res.redirect("/auth/login?type=error&message=" + "Incorrect Login Info");
});

router.get("/logout", async(req, res) => {
    return res.clearCookie('auth').redirect('/');
});

router.get("/", async(req, res) => {
    if(!req.cookies.auth) return res.redirect('/auth/login')
    return res.redirect('/') 
});

module.exports = {
    name: "Auth",
    location: "/auth",
    router: router
}