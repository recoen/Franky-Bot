const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { NSFW } = require('nsfw-ts')
const nsfw = new NSFW()
const commandListSchema = require('../../Schema/commandListSchema')
const serverSetupSchema = require("../../Schema/serverSetupSchema")
const config = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pussy')
    .setDescription('sends an image of a pussy'),
  category: 'nsfw',
  async execute(interaction) {
    const image = await nsfw.pussy()

    const embed = new EmbedBuilder()
      .setTitle('Here is your Pussy')
      .setImage(image)

    const no = new EmbedBuilder()
      .setTitle('you can not use this command')

    if (interaction.guild.id.includes('1038758556616376381')) return interaction.reply({ embeds: [embed] })
    if ([config.discord.yourId].includes(interaction.user.id)) return interaction.reply({ embeds: [embed], ephemeral: true })

    const ndata = await serverSetupSchema.findOne({ Guild: interaction.guild.id })
    if (!ndata) {
      serverSetupSchema.create({
        Guild: interaction.guild.id,
        nsfwToggle: false
      })
      interaction.reply({
        embeds: [
          no
            .setDescription('The server owner has turned off nsfw on this server')
        ], ephemeral: true
      })
    } else if (ndata.nsfwToggle === false) {
      interaction.reply({
        embeds: [
          no
            .setDescription('The server owner has turned off nsfw on this server')
        ], ephemeral: true
      })
    } else if (!interaction.channel.nsfw) {
      interaction.reply({
        embeds: [
          no
            .setDescription('pls make sure you have NSFW channel enabled')
            .setImage('https://cdn.discordapp.com/attachments/1002090813062389760/1048782034421698641/image.png')
        ], ephemeral: true
      })
    } else {
      interaction.reply({ embeds: [embed] })
    }
    const cmd = await commandListSchema.findOne({ User: interaction.user.id })
    const ggive = 1

    if (cmd.pussy + ggive) {
      cmd.pussy += ggive
      await cmd.save()
    } else {
      cmd.pussy = + ggive
      cmd.save()
    }
  }
}