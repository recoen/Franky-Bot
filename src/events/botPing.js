const { Events, EmbedBuilder, PermissionFlagsBits, ChannelType} = require("discord.js");
const em = require('../emoji.json')
const config = require('../config.json')

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;
    const contains = message.mentions.has(client.user) && (!message.author.bot)
    if (contains === message.content.includes("@here") || message.content.includes("@everyone") || message.reference) return false
    if (contains) message.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`Hi There ${em.other.pepeWaving}`)
                .setDescription(`I am a really fun bot that hopefully keep ur server active, i have some games to entertain your community`)
                .setFields(
                    {
                        name: `Got Stuck?`,
                        value: `Run </help:1047280810404880475> to get the full command list`
                    },
                    {
                        name: 'Info about me',
                        value: `Run </botinfo:1062948143026667541> to get to know me :)`
                    }
                )
                .setFooter({ text: `Developed with love 🧡` })
                .setColor(config.color.embed)
        ]
    })
    }
};