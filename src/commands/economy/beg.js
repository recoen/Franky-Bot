const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const economyschema = require('../../schema/economySchema')
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('beg to see if you get money'),
    category: 'Economy',
    cooldown: 60000,
    async execute(interaction) {
        const RN = Math.floor(Math.random() * 100)
        if (RN > 50) {
            const give = Math.floor(Math.random() * 300) + 10
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
                .setDescription(`some one felt sorry for and gave you $${give}`)

            interaction.reply({ embeds: [embed] })
        } else {
            const embed = new EmbedBuilder()
                .setColor(config.color.no)
                .setDescription(`Get a job hobo`)

            interaction.reply({ embeds: [embed] })
        }
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.beg + ggive) {
            cmd.beg += ggive
            await cmd.save()
        } else {
            cmd.beg = + ggive
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