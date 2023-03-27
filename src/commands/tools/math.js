const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const math = require('mathjs')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('does your homework')
        .addStringOption(
            option => option
                .setName('question')
                .setDescription('math here (+, - , *, ^, %)')
                .setRequired(true)
        ),
    category: 'Tools',
    async execute(interaction) {
        let question = interaction.options.getString('question')
        let result
        try {
            result = math.evaluate(question)
        } catch (e) {
            return await interaction.reply({ content: 'please provide a valid equation', ephemeral: true })
        }
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} is stuck`)
            .setDescription(`here is ur maths problem\n${question} = ${result}`)
            .setColor('Random')
        interaction.reply({ embeds: [embed] })
        
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.math + ggive) {
            cmd.math += ggive
            await cmd.save()
        } else {
            cmd.math = + ggive
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