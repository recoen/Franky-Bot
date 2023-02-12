const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const math = require('mathjs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('does your homework (+, - , *, ^, %)')
        .addStringOption(
            option => option
                .setName('question')
                .setDescription('math here')
                .setRequired(true)
        ),
    category: 'Tools',
    async execute(interaction) {
        let question = interaction.options.getString('question')
        let result
        try {
            result = math.evaluate(question)
        } catch (e) {
            interaction.reply({ content: 'please provide a valid equation', ephemeral: true })
        }
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} is stuck`)
            .setDescription(`here is ur maths problem\n${question} = ${result}`)
            .setColor('Random')
        interaction.reply({ embeds: [embed] })
    }
}