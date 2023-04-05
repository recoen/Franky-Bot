const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const config = require('../../config.json')
const nsfwSchema = require('../../Schema/serverSetupSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nsfw-toggle')
        .setDescription('turns on or off the nsfw on your server')
        .addBooleanOption(
            option => option
                .setName('nsfw')
                .setDescription('Whether or not the server should have nsfw enabled')
                .setRequired(true)
                ),
    category: 'Setup',
    ownerOnly: true,
    async execute(interaction, client) {
        const data = await nsfwSchema.findOne({ Guild: interaction.guild.id })
        const string = interaction.options.getBoolean('nsfw')

        if (string == false) {
            if (!data) {
                nsfwSchema.create({
                    Guild: interaction.guild.id,
                    nsfwToggle: false
                })
                const off = new EmbedBuilder()
                    .setTitle('nsfw off')
                    .setColor(config.color.no)
                    .setDescription('NSFW is off, on this server')
                interaction.reply({ embeds: [off] })
            } else if (data.nsfwToggle == false) {
                interaction.reply({ content: 'nsfw is already Disabled', ephemeral: true })
            } else {
                const off = new EmbedBuilder()
                    .setTitle('nsfw off')
                    .setColor(config.color.no)
                    .setDescription('NSFW is off, on this server')
                interaction.reply({ embeds: [off] })
                data.nsfwToggle = string
                data.save()
            }
        }

        if (string == true) {
            if (!data) {
                nsfwSchema.create({
                    Guild: interaction.guild.id,
                    nsfwToggle: true
                })
                const on = new EmbedBuilder()
                    .setTitle('nsfw on')
                    .setColor(config.color.yes)
                    .setDescription('NSFW is Enabled, on this server')

                interaction.reply({ embeds: [on] })
            } else if (data.nsfwToggle == true) {
                interaction.reply({ content: 'nsfw is already enabled', ephemeral: true })
            } else {
                const on = new EmbedBuilder()
                    .setTitle('nsfw on')
                    .setColor(config.color.yes)
                    .setDescription('NSFW is Enabled, on this server')

                interaction.reply({ embeds: [on] })
                data.nsfwToggle = string
                data.save()
            }
        }
    }
}