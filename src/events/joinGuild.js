const { Events, EmbedBuilder, PermissionFlagsBits, ChannelType} = require("discord.js");
const em = require('../emoji.json')
const config = require('../config.json')

module.exports = {
    name: Events.GuildCreate,
    async execute(guild, client) {
        const welcomeEmbed = new EmbedBuilder()
        .setTitle(`Thank You For Inviting Me ${em.other.pepeYay}`)
        .setColor(config.color.embed)
        .setDescription('Thank you for inviting, if you find a bug please let the developer know instantly.\n **What Can I Do?**\n> Music Command\n> Games, some fun games to play with your community\n> and HEAPS more')
        .setFields(
            {
                name: 'To get Started,',
                value: 'Run </help:1047280810404880475> and open setup (dont need to if you want you can add them)'
            },
            {
                name: 'Support',
                value: `Join The Discord Server [[HERE]](${config.discord.invite})`
            }
        )
        
    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
        if (channel.type == ChannelType.GuildText && defaultChannel == "") {
            if (channel.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages)) {
                defaultChannel = channel;
            }
        }
    })
    const ownerId = guild.ownerId
    const owner = guild.members.cache.get(ownerId)
    owner.send({ embeds: [welcomeEmbed] }).catch(err => defaultChannel.send({ embeds: [welcomeEmbed]}))
    }
};