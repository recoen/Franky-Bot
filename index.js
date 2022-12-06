const { Client, Collection, ActivityType } = require(`discord.js`);
const client = new Client({ intents: 3276799 });

client.commands = new Collection();

const fs = require('fs');
const config = require('./config.json')
//const SunRodAPI = require('sunrod-api');
//client.sunrod = new SunRodAPI('z9MwcGD47wWn2mHu5nfprEpPYKC5TPJTk7hcHn8X46nyVQs9U7');

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

const express = require('express');
const app = express();
const port = 6969;

app.get('/', function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const responseString = `Full URL is: ${fullUrl}`;
    res.send(responseString)
})
app.listen(port, () => {
    //console.log(`website is running from ${port}`) // Website is running
});

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands");
    client.login(config.token)
})();


client.on('ready', async () => {
    let servers = await client.guilds.cache.size
    let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
    const activities = [
        `${servers} Servers`,
        `${servercount} Members`,
    ]
    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)]
        client.user.setPresence({
            activities: [{ name: `${status}`, type: ActivityType.Watching }],
            status: 'online',
          });
    }, 5000)
})


/*
const RPC = require('discord-rpc')
const rpc = new RPC.Client({
    transport: 'ipc'
})

rpc.on("ready", () => {
    rpc.setActivity({
        details: "Invite Franky Today",
        state: "Join the Discord",
        startTimestamp: new Date(),
        largeImageKey: "large",
        largeImageText: "Franklin",
        buttons : [{label : "BOT" , url : "https://discord.com/api/oauth2/authorize?client_id=992309600361660466&permissions=8&scope=bot%20applications.commands"}, {label : "DISCORD", url : "https://discord.gg/pZwV7YXztt"}]
    })

    console.log("seccussfully turned on")
})

rpc.login({
    clientId: '992309600361660466'
})
*/