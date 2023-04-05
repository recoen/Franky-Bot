const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const serverSetupSchema = require('../../Schema/serverSetupSchema');
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('franky-logs')
    .setDescription('Logs anything to do with the bot, eg /spoof')
    .addChannelOption(
        option => option
        .setName('channel')
        .setDescription('the channe where you want /spoof logs to go')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
    category: 'Setup', 
    ownerOnly: true,
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel')
        const sdata = await serverSetupSchema.findOne({ Guild: interaction.guild.id })
        const embed = new EmbedBuilder()
            .setTitle('Franky Logs')
            .setDescription(`You have put Franky logs in channel ${channel}`)
            .setColor(config.color.embed)
        
        if(!sdata) {
            serverSetupSchema.create({
                Guild: interaction.guild.id,
                logChannelID: channel.id,
                frankyLogsEnabled: true,
                nsfwToggle: false
            })
        } else {
            sdata.logChannelID = channel.id
            sdata.frankyLogsEnabled = true
            sdata.save()
        }
        interaction.reply({ embeds: [embed]})
    }
}