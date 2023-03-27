const { ShardingManager } = require('discord.js')
const config = require('./src/config.json')
require('colors')

const manager = new ShardingManager('./src/index.js', {
    token: config.discord.token
})

console.clear()
console.log('[SYSTEM]'.dim + ' Starting up...'.bold)
console.log(' ')



manager.on("shardCreate", (shard) => {
    console.log(`[SHARDS]`.blue + ` launched Shard`.bold + ` #${shard.id}`.green)
    console.log(' ')
})

manager.spawn()