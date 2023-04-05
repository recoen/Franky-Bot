const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a bug')
        .addStringOption(
            option => option
                .setName('title')
                .setDescription('Title of the problem')
                .setRequired(true)
        )
        .addStringOption(
            option => option
                .setName('description')
                .setDescription('Description of the problem')
                .setRequired(true)
        ),
    category: 'Tools',
    async execute(interaction, client) {
        const t = interaction.options.getString('title')
        const d = interaction.options.getString('description')
        const channel = client.channels.cache.get(config.discord.reportChannel)

        const embed = new EmbedBuilder()
        .setTitle(t)
        .setDescription(d)
        .setTimestamp()
        .setFooter({ text: `Report By: ${interaction.user.tag}`})

        channel.send({ embeds: [embed]})
        interaction.reply({ content: `You for Reporting, we will get back to you soon, join the discord ${config.discord.invite}`, ephemeral: true})
    }
}