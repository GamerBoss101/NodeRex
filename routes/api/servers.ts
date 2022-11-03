// @ts-nocheck
const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get("/:serverID", async(req, res) => {
    
});

router.get("/", async(req, res) => {
    let servers = []

    fs.readdirSync(`./servers/`).forEach((dir) => {
        let config = require(`../../servers/${dir}/noderex.config.json`)
        servers.push(config)
    })

    res.send(servers)
});
  
module.exports = {
    name: "api-server",
    location: "/v1/server",
    router: router
}