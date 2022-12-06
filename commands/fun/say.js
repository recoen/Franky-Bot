const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('I will say anything you want')
        .addStringOption(option =>
            option
                .setName("input")
                .setDescription('anything u type here, i will say')
                .setRequired(true)
        ),

    async execute(interaction) {
        const msg = interaction.options.getString('input')
        await interaction.reply(msg)
    }
}