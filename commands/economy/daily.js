const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const economyschema = require('../../schema/economySchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('daily amount of money'),
    category: 'Economy',
    cooldown: 86400000,
    async execute(interaction) {
            const give = Math.floor(Math.random() * 900) + 300
            const data = await economyschema.findOne({ User: interaction.user.id })
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
                .setDescription(`You got $${give} from the daily`)

            interaction.reply({ embeds: [embed] })
    }
}