const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const economyschema = require('../../schema/economySchema')
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('monthly')
        .setDescription('monthlu amount of money'),
    category: 'Economy',
    cooldown: 2628000000,
    async execute(interaction) {
            const give = Math.floor(Math.random() * 10000) + 10000
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
                .setColor(config.color.yes)
                .setDescription(`You got $${give} from the weekly`)

            interaction.reply({ embeds: [embed] })

            const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.monthly + ggive) {
            cmd.monthly += ggive
            await cmd.save()
        } else {
            cmd.monthly = + ggive
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