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
