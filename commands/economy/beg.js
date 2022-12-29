const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moneySchema = require('../../Schema/moneySchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('beg to see if you get money'),
    timeout: 60000,
    async execute(interaction) {
        const RN = Math.floor(Math.random() * 100)
        if (RN > 50) {
            const give = Math.floor(Math.random() * 300) + 10
            const data = await moneySchema.findOne({ User: interaction.user.id })
            if (!data) return
            if (data.Money + give) {
                data.Money += give
                await data.save()
            } else {
                data.Money += give
                data.save()
            }

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setDescription(`some one felt sorry for and gave you $${give}`)

            interaction.reply({ embeds: [embed] })
        } else {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`Get a job hobo`)

            interaction.reply({ embeds: [embed] })
        }
    }
}