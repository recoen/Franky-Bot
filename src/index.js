const { Client, Collection, EmbedBuilder } = require(`discord.js`);
const client = new Client({ intents: 3276799 });

const fs = require('fs');
const config = require('./config.json')
require('colors')
//const SunRodAPI = require('sunrod-api');
//client.sunrod = new SunRodAPI(config.sunRodAPIKey);

client.commands = new Collection();
client.timeouts = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

//handlers
(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(config.discord.token)
})();

//music (lavalink)
const { Manager } = require('erela.js');
const Spotify = require("erela.js-spotify");
const Facebook = require("erela.js-facebook");
const Deezer = require("erela.js-deezer");
const AppleMusic = require("erela.js-apple");
const clientID = config.spotify.clientId
const clientSecret = config.spotify.clientSecret
const yes = new EmbedBuilder()
    .setColor('Green')
    .setTitle('Music')
const no = new EmbedBuilder()
    .setColor('Red')
    .setTitle('Music')
if (clientID && clientSecret) {
    client.manager = new Manager({
        plugins: [
            new AppleMusic(),
            new Deezer(),
            new Facebook(),
            new Spotify({
                clientID,
                clientSecret
            })
        ],
        nodes: [{
            host: 'localhost',
            port: 8080,
            password: 'yourpassword',
            retryAmount: 5,
            retryDelay: 5000,
        }],
        defaultSearchPlatform: 'soundcloud',
        send: (id, payload) => {
            let guild = client.guilds.cache.get(id)
            if (guild) guild.shard.send(payload)
        }
    })
        .on("nodeConnect", node => console.log(`[MUSIC] `.red + `Lavalink`.bold + ` Connection Successful`.green + '\n '))
        .on("nodeError", (node, error) => console.log(`[MUSIC] `.red + `Lavalink`.bold + ` Couldn't Connect`.red + `\n`))
        .on("trackStart", (player, track) => {
            client.channels.cache
                .get(player.textChannel)
                .send({ embeds: [yes.setDescription(`Now playing: ${track.title}`)] });
        })
        .on("queueEnd", (player) => {
            client.channels.cache
                .get(player.textChannel)
                .send({ embeds: [no.setDescription("Queue has ended.")] })

            player.destroy();
        });
} else {
    client.manager = new Manager({
        plugins: [
            new AppleMusic(),
            new Deezer(),
            new Facebook()
        ],
        nodes: [{
            host: 'localhost',
            port: 8080,
            password: 'yourpassword',
            retryAmount: 5,
            retryDelay: 5000,
        }],
        defaultSearchPlatform: 'soundcloud',
        send: (id, payload) => {
            let guild = client.guilds.cache.get(id)
            if (guild) guild.shard.send(payload)
        }
    })
        .on("nodeConnect", node => console.log(`[MUSIC] `.red + `Lavalink`.bold + ` Connection Successful`.green + '\n '))
        .on("nodeError", (node, error) => console.log(`[MUSIC] `.red + `Lavalink`.bold + ` Couldn't Connect`.red + `\n`))
        .on("trackStart", (player, track) => {
            client.channels.cache
                .get(player.textChannel)
                .send({ embeds: [yes.setDescription(`Now playing: ${track.title}`)] });
        })
        .on("queueEnd", (player) => {
            client.channels.cache
                .get(player.textChannel)
                .send({ embeds: [no.setDescription("Queue has ended.")] })

        });
}

client.on("raw", (d) => client.manager.updateVoiceState(d));