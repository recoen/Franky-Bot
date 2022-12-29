const mongoose = require('mongoose')
const config = require('../config.json')
const color = require('colors')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if(mongoose.connect) {
            console.log('MongoDB connection succesful'.green)
        } else {
            console.log('MongoDB couldnt connect'.red)
        }
        

        let servers = await client.guilds.cache.size
        let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
        console.log(`${client.user.tag}`.magenta + ` is ` + `online`.green + `, Watching ` + `${servers}`.bold + ` Servers `.red + `and ` + `${servercount}`.bold + ` Members`.blue)
    },
};