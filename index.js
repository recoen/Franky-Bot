const { Client, Collection, ActivityType, Events } = require(`discord.js`);
const client = new Client({ intents: 3276799 });

client.commands = new Collection();
client.timeouts = new Collection();

const fs = require('fs');
const config = require('./config.json')
require('colors')
//const SunRodAPI = require('sunrod-api');
//client.sunrod = new SunRodAPI(config.sunRodAPIKey);

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

module.exports = client;

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./commands");
    client.login(config.token)
})();