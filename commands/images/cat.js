const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('gives you a random cat image'),
    category: 'Image',
    async execute(interaction) {
        const url = 'https://api.thecatapi.com/v1/images/search'
        const info = await fetch(url).then(res => res.json())
        const image = await info[0].url
        
        const embed = new EmbedBuilder()
        .setURL(image)
        .setTitle('Cat')
        .setImage(image)
        .setColor(config.color.embed)

        interaction.reply({ embeds: [embed]})
    }
}