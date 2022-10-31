// @ts-nocheck
const EventEmitter = require('events');

const fs = require('fs');
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const Ascii = require("ascii-table");

const http = require('http').Server(app);
const io = require('socket.io')(http);

const events = new EventEmitter();
const servers = new Map();

// WEBSTUFF
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('socketio', io)
app.set('events', events)
app.set("database", require('./storage/database/mongo.ts'));
app.use("/assets", express.static("assets"));
app.use("/storage", express.static("storage"));

// WEB ROUTES 

const Table = new Ascii("Web Routes");
const Categories = ["panel", "api", "auth"];
Categories.forEach((Category) => {
    const routes = fs.readdirSync(`./routes/${Category}`).filter(file => file.endsWith('.ts'));
    for(const file of routes){
        const Subroutes = require(`./routes/${Category}/${file}`);

        if(Subroutes.name) {
            app.use(`${Subroutes.location}`, Subroutes.router);

            Table.addRow(Subroutes.name, "✅ Succesfully loaded!");
        } else {
            Table.addRow(Subroutes, "❌ Failed to load");
        }
    }
});

app.get('*', function(req, res){
    res.render("404", {
        path: req.path,
    });
});

console.log(Table.toString());

require("./socket.ts")(io, events)

// READY
mongoose.connect(process.env.Mongo).then(() => { console.log("Connected to DataBase") });
http.listen(process.env.Port, () => { console.log( `Server is running on localhost:${process.env.Port} !`) });

// EXPORTS
module.exports.dirname = __dirname;
module.exports.io = io;
module.exports.events = events;
module.exports.servers = servers;

// PROCESS

process.on('uncaughtException', function (err) {
    console.log('uncaughtException: ' + err)
})

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection: ' + err)
})