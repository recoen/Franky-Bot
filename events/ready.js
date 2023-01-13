const mongoose = require('mongoose')
const config = require('../config.json')
require('colors')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        //connecting to mongooose
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if(mongoose.connect) {
            console.log('MongoDB connection successfull'.green)
        } else {
            console.log('MongoDB couldnt connect'.red)
        }
        
        //all servers and members the franky can see
        let servers = await client.guilds.cache.size
        let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

        setTimeout(() => {
            console.log(`${client.user.tag}`.magenta + ` is ` + `online`.green)
        }, 100)
        setTimeout(() => {
            console.log(`Watching ` + `${servers}`.bold + ` Servers `.red + `and ` + `${servercount}`.bold + ` Members`.blue)
        }, 300)

        //activity showing on the bot
        const activities = [
            { name: `${servers} Servers`, type: 3 }, //watching
            { name: `${servercount} Members`, type: 2 }, //listening
            { name: `you ;-;`, type: 3 },
            { name: `/help`, type: 0 } //playing
        ]
        let i = 0;
        setInterval(() => {
            if (i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, 5000);
    },
};