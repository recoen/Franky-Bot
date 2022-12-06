const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('howgay')
    .setDescription('Calculates how gay people are')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('Targets gay percentage')
    ),

    async execute(interaction) {
        let target = interaction.options.getUser('target') || interaction.user;
        let random = Math.floor(Math.random() * 101);

        const embed = new EmbedBuilder()
        .setTitle('🌈 How Gay Are You?')
        .setDescription(`${target.username} is ` + random + `% Gay`)
        .setTimestamp()
        interaction.reply({embeds: [embed] })
    }
}