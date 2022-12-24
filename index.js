const { Client, Collection, ActivityType } = require(`discord.js`);
const client = new Client({ intents: 3276799 });

client.commands = new Collection();

const fs = require('fs');
const config = require('./config.json')

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

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
