const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { NSFW } = require('nsfw-ts')
const nsfw = new NSFW()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gonewild')
    .setDescription('sends an image people going wild (nsfw)'),
    category: 'nsfw',
  async execute(interaction) {
    const image = await nsfw.pussy()
    const embed = new EmbedBuilder()
      .setTitle('Here is goneWild')
      .setImage(image)

    const no = new EmbedBuilder()
      .setTitle('you can not use this command')
      .setDescription('pls make sure you have NSFW channel enabled')
      .setImage('https://cdn.discordapp.com/attachments/1002090813062389760/1048782034421698641/image.png')

      if(interaction.guild.id.includes('1038758556616376381')) return interaction.reply({ embeds: [embed]})
      if(['692197998939209789', '876352982734749736'].includes(interaction.user.id)) return interaction.reply({ embeds: [embed], ephemeral: true})

    if (interaction.channel.nsfw) {
      interaction.reply({ embeds: [embed] })
    } else {
      interaction.reply({ embeds: [no], ephemeral: true })
    }
  }
}