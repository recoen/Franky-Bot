const { ActivityType } = require('discord.js');
const mongoose = require('mongoose')
const config = require('../config.json')
require('colors')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        //Lavalink
        client.manager.init(config.discord.clientId)

        //connecting to mongooose
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('[DATABASE]'.green + ' MongoDB'.bold + ' Connection Successful'.green)
            console.log(' ')
        } else {
            console.log('[DATABASE]'.green + ' MongoDB'.bold + " Couldn't Connect".red)
        }

        //all servers and members the franky can see
        let servers = await client.guilds.cache.size
        let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

        setTimeout(() => {
            console.log('[SYSTEM]'.dim + ' Started on' + ` ${servers}`.bold + ` Servers `.blue)
        }, 100)
        setTimeout(() => {
            console.log('[SYSTEM]'.dim + ` ${client.user.tag}`.magenta + ` is ` + `online`.green)
        }, 300)

        //activity showing on the bot
        const activities = [
            { name: `${servers} Servers`, type: ActivityType.Listening },
            { name: `${servercount} Members`, type: ActivityType.Watching },
            { name: `you ;-;`, type: ActivityType.Watching },
            { name: `/help`, type: ActivityType.Playing },
            { name: `With Trolls`, type: ActivityType.Playing },
            { name: `${client.commands.size} Commands`, type: ActivityType.Watching },
            { name: `My Developer struggle`, type: ActivityType.Watching }
        ]
        let i = 0;
        setInterval(() => {
            if (i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, 10000);
    },
};