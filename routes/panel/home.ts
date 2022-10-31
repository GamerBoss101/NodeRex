// @ts-nocheck
const express = require("express");
const router = express.Router();
const fs = require('fs');

var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", async(req, res) => {
    if(req.cookies.auth != process.env.AdminPassword) return res.redirect('/auth/login')
    else res.render("dashboard");
});

module.exports = {
    name: "dashboard",
    location: "/",
    router: router
}