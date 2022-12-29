const { Client, Collection, ActivityType, Events } = require(`discord.js`);
const client = new Client({ intents: 3276799 });

client.commands = new Collection();
client.timeouts = new Collection()

const fs = require('fs');
const config = require('./config.json')

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

module.exports = client;

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

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
        { name: `${servers} Servers`, type: 3 }, //watching
        { name: `${servercount} Members`, type: 2}, //listening
        { name: `you ;-;`, type: 3},
        { name: `/help`, type: 0} //playing
    ]
    let i = 0;
    setInterval(() => {
        if (i >= activities.length) i = 0
        client.user.setActivity(activities[i])
        i++;
    }, 5000);
})

const moneyschema = require('./Schema/moneySchema')
client.on(Events.MessageCreate, async message => {
    const { guild, author } = message
    if (!guild || author.bot) return
    moneyschema.findOne({ User: author.id }, async (err, data) => {
        if (err) throw err
        if (!data) {
            moneyschema.create({
                User: author.id,
                Money: 100
            })
        }
    })

    const give = Math.floor(Math.random() * 9 ) + 1
    const data = await moneyschema.findOne({ User: author.id })
    if(!data) return

    if(data.Money + give) {
        data.Money += give
        await data.save()
    } else {
        data.Money =+ give
        data.save()
    }
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
