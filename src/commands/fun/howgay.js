const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('howgay')
    .setDescription('Calculates how gay people are')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('Targets gay percentage')
    ),
    category: 'Fun',
    cooldown: 0,
    async execute(interaction) {
        let target = interaction.options.getUser('target') || interaction.user;
        let random = Math.floor(Math.random() * 101);

        const embed = new EmbedBuilder()
        .setTitle('🌈 How Gay Are You?')
        .setDescription(`${target.username} is ` + random + `% Gay`)
        .setTimestamp()
        interaction.reply({embeds: [embed] })

        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.howgay + ggive) {
            cmd.howgay += ggive
            await cmd.save()
        } else {
            cmd.howgay = + ggive
            cmd.save()
        }
    }
}