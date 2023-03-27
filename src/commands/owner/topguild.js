const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topguilds')
        .setDescription('Shows the top guilds the bot is in (OWNER ONLY)'),
    category: 'Owner',
    devOnly: true,
    async execute(interaction, client) { const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(10);

        const description = guilds
            .map((guild, index) => {
                return `${index + 1}) ${guild.name} -> ${guild.memberCount} members`;
            })
            .join("\n");


        const embed = new EmbedBuilder()
            .setTitle('Top Guilds')
            .setDescription(`Place | Name | Members\n` + description + `\n\nAll Member: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\nAll Servers: ${client.guilds.cache.size}`)
            .setColor('#2f3136')

        interaction.reply({ embeds: [embed] })
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.topguild + ggive) {
            cmd.topguild += ggive
            await cmd.save()
        } else {
            cmd.topguild = + ggive
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