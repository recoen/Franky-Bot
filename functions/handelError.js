const { Client, EmbedBuilder } = require("discord.js")
const config = require('../config.json')

module.exports = async (client) => {
    
    const Embed = new EmbedBuilder()
        .setColor('NotQuiteBlack')
        .setTimestamp()
        .setFooter({text: "Anti crash"})
        .setTitle("⚠️ | Error Encountered")

    process.on("unhandledRejection", (reason, p) => {

        console.log(reason, p)

        const Channel = client.channels.cache.get(config.errChannel)
        if(!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Unhandled Rejection/Catch:\n\n** " + reason + " ")
            ]
        })
    })

    process.on("uncaughtException", (err, origin) => {

        console.log(err, origin)

        const Channel = client.channels.cache.get(config.errChannel)
        if(!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Uncaught Exception/Catch (monitor):\n\n** " + err + "\n\n" + origin.toString() + " ")
            ]
        })
    })
    
}
