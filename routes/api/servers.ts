// @ts-nocheck
const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get("/", async(req, res) => {
    res.render("dashboard");
    addEvent(req, 50)
});

router.get("/exe", async(req, res) => {
    res.render("dashboard");
    req.app.get('events').emit("dashboard" + 50, "HOII")
});
  
module.exports = {
    name: "api-server",
    location: "/v1/server",
    router: router
}