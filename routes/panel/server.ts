// @ts-nocheck
const express = require("express");
const router = express.Router();
const fs = require('fs');

var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/console", async(req, res) => {
    if(req.cookies.auth != process.env.AdminPassword) return res.redirect('/auth/login')

    res.render('server/console', {

    })
});

router.get("/", async(req, res) => {
    if(req.cookies.auth != process.env.AdminPassword) return res.redirect('/auth/login')
    else res.redirect('/server/console')
});

module.exports = {
    name: "Server",
    location: "/server",
    router: router
}