const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const moment = require('moment')
require("moment-duration-format");
const os = require('os')
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('info about the bot'),
    category: 'Info',
    cooldown: 0,
    async execute(interaction, client) {
        const command = client.commands.size
        const servers = await client.guilds.cache.size
        const ping = client.ws.ping
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle(`${client.user.tag}'s info`)
            .setDescription(`<@${client.user.id}> is a fun bot that has looks of commands, the main porpuse of this bot, is to have fun trolling friends and just have fun. <@${client.user.id}> has so many different features, Music, econmy and more`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: `Total Commands`, value: `${command}`, inline: true },
                { name: `Total Servers`, value: `${servers}`, inline: true},
                { name: `Bot Ping`, value: `${ping}ms`, inline: true },
                { name: `Uptime`, value: `${duration}`, inline: true },
                { name: `Discord Invite`, value: `[Here](${config.discord.invite})`, inline: true},
                { name: `Bot Invite`, value: `[Here](https://discord.com/api/oauth2/authorize?client_id=${config.discord.clientId}&permissions=1789394406464&scope=bot%20applications.commands)`, inline: true}
            )
            .setFooter({ text: `Franklin#8332 Coded this bot`, iconURL: 'https://images-ext-1.discordapp.net/external/0edtCJmJ4eJeZKAQ9xR19RXeO596fTryBtEiGTNufKA/%3Fsize%3D512/https/cdn.discordapp.com/avatars/692197998939209789/18279117d2ebc55a4ddd8147da9137a5.webp'})

        interaction.reply({ embeds: [embed]})
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.botinfo + ggive) {
            cmd.botinfo += ggive
            await cmd.save()
        } else {
            cmd.botinfo = + ggive
            cmd.save()
        }

        if (cdata.TotalCmd + ggive) {
            cdata.TotalCmd += ggive
            await cdata.save()
        } else {
            cdata.TotalCmd = + ggive
            cdata.save()
        }
    }
}