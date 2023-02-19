const { ShardingManager } = require('discord.js')
const config = require('./config.json')
require('colors')

const manager = new ShardingManager('./index.js', {
    token: config.discord.token
})

manager.on("shardCreate", (shard) => {
    console.log(`[SHARDS]`.blue + ` launched Shard`.bold + ` [${shard.id}]`.green)
})

manager.spawn()