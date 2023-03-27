const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { NSFW } = require('nsfw-ts')
const nsfw = new NSFW()
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')
const serverSetupSchema = require("../../Schema/serverSetupSchema")
const config = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('porngif')
    .setDescription('sends a gif of porn'),
    category: 'nsfw',
  async execute(interaction) {
    const image = await nsfw.pgif()
    const embed = new EmbedBuilder()
      .setTitle('Here is gif')
      .setImage(image)

      const no = new EmbedBuilder()
      .setTitle('you can not use this command')

    if (interaction.guild.id.includes('1038758556616376381')) return interaction.reply({ embeds: [embed] })
    if ([config.discord.yourId].includes(interaction.user.id)) return interaction.reply({ embeds: [embed], ephemeral: true })

    const ndata = await serverSetupSchema.findOne({ Guild: interaction.guild.id })
    if(!ndata) {
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
    }
    try {
      if (ndata.nsfwToggle === false) {
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
    } catch (e) {
      return
    }

    const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.porngif + ggive) {
            cmd.porngif += ggive
            await cmd.save()
        } else {
            cmd.porngif = + ggive
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