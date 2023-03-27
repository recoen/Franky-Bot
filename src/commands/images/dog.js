const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('gives you a random dog image'),
    category: 'Image',
    async execute(interaction) {
        const url = 'https://api.thedogapi.com/v1/images/search'
        const info = await fetch(url).then(res => res.json())
        const image = await info[0].url
        
        const embed = new EmbedBuilder()
        .setURL(image)
        .setTitle('Dog')
        .setImage(image)
        .setColor(config.color.embed)

        interaction.reply({ embeds: [embed]})
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.dog + ggive) {
            cmd.dog += ggive
            await cmd.save()
        } else {
            cmd.dog = + ggive
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