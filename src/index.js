const { Client, Collection, EmbedBuilder, Events, ChannelType, PermissionFlagsBits } = require(`discord.js`);
const client = new Client({ intents: 3276799 });

const fs = require('fs');
const config = require('./config.json')
const em = require('./emoji.json')
require('colors')
const moment = require('moment')
require("moment-duration-format");
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

const embed = new EmbedBuilder()
    .setColor(config.color.embed)
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
            const dur = moment.duration(track.duration).format(" D[d], H[h], m[m], s[s]")
            client.channels.cache
                .get(player.textChannel)
                .send({
                    embeds: [embed
                        .setURL(track.uri)
                        .setFields(
                            { name: `🎵|Title`, value: `${track.title}`, inline: true },
                            { name: `🎬|Author`, value: `${track.author}`, inline: true },
                            { name: `${em.other.clock}|Duraction`, value: `${dur}`, inline: true },
                        )
                        .setColor(config.color.embed)
                        //.setThumbnail(track.displayThumbnail())
                    ]
                });
        })
        .on("queueEnd", (player) => {
            client.channels.cache
                .get(player.textChannel)
                .send({ embeds: [embed.setDescription("Queue has ended.").setColor('Red').setFields()] })

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
            const dur = moment.duration(track.duration).format(" D[d], H[h], m[m], s[s]")
            client.channels.cache
                .get(player.textChannel)
                .send({
                    embeds: [embed
                        .setURL(track.uri)
                        .setFields(
                            { name: `🎵|Title`, value: `${track.title}`, inline: true },
                            { name: `🎬|Author`, value: `${track.author}`, inline: true },
                            { name: `${em.other.clock}|Duraction`, value: `${dur}`, inline: true },
                        )
                        .setColor(config.color.embed)
                        //.setThumbnail(track.displayThumbnail())
                    ]
                });
        })
        .on("queueEnd", (player) => {
            client.channels.cache
                .get(player.textChannel)
                .send({ embeds: [embed.setDescription("Queue has ended.").setColor('Red').setFields()] })

            player.destroy();
        });
}

client.on("raw", (d) => client.manager.updateVoiceState(d));