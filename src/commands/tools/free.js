const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { FreeStuffApi } = require("freestuff");
const em = require("../../emoji.json");
const config = require('../../config.json')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("free")
    .setDescription("get a list of games that are 100% free"),
  cooldown: 0,
  category: 'Tools',
  async execute(interaction, client) {
    await interaction.deferReply()

    if (!config.apiKey.freeStuff) {
      await interaction.editReply({ content: 'sorry dev doesnt have the key to use this command', ephemeral: true })
    } else {
      const fsapi = new FreeStuffApi({
        key: config.apiKey.freeStuff,
        cacheTtl: {
          gameList: 1000,
          gameDetails: 1000,
        },
      });
      const games = await fsapi.getGameList("free");
      const info = await fsapi.getGameDetails(games, "info");

      const embed = new EmbedBuilder()
        .setTitle(`Free game that are 100% off`)
        .setColor(config.color.embed)

      const title1 = Object.keys(info).map(stuff => info[stuff].title)[0]
      const url1 = Object.keys(info).map(stuff => info[stuff].urls.default)[0]
      const org_pirce1 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[0]
      const store1 = Object.keys(info).map(stuff => info[stuff].store)[0]
      const until1 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[0]) / 1000)
      const game1 = `${em.store[store1] || '❔'}[${title1}](${url1})\n${em.other.nothing}~~$${org_pirce1}~~・until <t:${until1}:d>`


      const title2 = Object.keys(info).map(stuff => info[stuff].title)[1]
      const url2 = Object.keys(info).map(stuff => info[stuff].urls.default)[1]
      const org_pirce2 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[1]
      const store2 = Object.keys(info).map(stuff => info[stuff].store)[1]
      const until2 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[1]) / 1000)
      const game2 = `${em.store[store2] || '❔'}[${title2}](${url2})\n${em.other.nothing}~~$${org_pirce2}~~・until <t:${until2}:d>`


      const title3 = Object.keys(info).map(stuff => info[stuff].title)[2]
      const url3 = Object.keys(info).map(stuff => info[stuff].urls.default)[2]
      const org_pirce3 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[2]
      const store3 = Object.keys(info).map(stuff => info[stuff].store)[2]
      const until3 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[2]) / 1000)
      const game3 = `${em.store[store3] || '❔'}[${title3}](${url3})\n${em.other.nothing}~~$${org_pirce3}~~・until <t:${until3}:d>`


      const title4 = Object.keys(info).map(stuff => info[stuff].title)[3]
      const url4 = Object.keys(info).map(stuff => info[stuff].urls.default)[3]
      const org_pirce4 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[3]
      const store4 = Object.keys(info).map(stuff => info[stuff].store)[3]
      const until4 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[3]) / 1000)
      const game4 = `${em.store[store4] || '❔'}[${title4}](${url4})\n${em.other.nothing}~~$${org_pirce4}~~・until <t:${until4}:d>`


      const title5 = Object.keys(info).map(stuff => info[stuff].title)[4]
      const url5 = Object.keys(info).map(stuff => info[stuff].urls.default)[4]
      const org_pirce5 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[4]
      const store5 = Object.keys(info).map(stuff => info[stuff].store)[4]
      const until5 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[4]) / 1000)
      const game5 = `${em.store[store5] || '❔'}[${title5}](${url5})\n${em.other.nothing}~~$${org_pirce5}~~・until <t:${until5}:d>`


      const title6 = Object.keys(info).map(stuff => info[stuff].title)[5]
      const url6 = Object.keys(info).map(stuff => info[stuff].urls.default)[5]
      const org_pirce6 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[5]
      const store6 = Object.keys(info).map(stuff => info[stuff].store)[5]
      const until6 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[5]) / 1000)
      const game6 = `${em.store[store6] || '❔'}[${title6}](${url6})\n${em.other.nothing}~~$${org_pirce6}~~・until <t:${until6}:d>`



      if (!title1) {
        embed.setDescription('sorry there is no game free')

        await interaction.editReply({ embeds: [embed] })
      } else {
        const str = `**${game1}**`

        embed.setDescription(str)

        await interaction.editReply({ embeds: [embed] })
      }

      if (!title2) {
        return
      } else {
        const str = `**${game1}\n\n${game2}**`

        embed.setDescription(str)

        await interaction.editReply({ embeds: [embed] })
      }

      if (!title3) {
        return
      } else {
        const str = `**${game1}\n\n${game2}\n\n${game3}**`

        embed.setDescription(str)

        await interaction.editReply({ embeds: [embed] })
      }
      if (!title4) {
        return
      } else {
        const str = `**${game1}\n\n${game2}\n\n${game3}\n\n${game4}**`

        embed.setDescription(str)

        await interaction.editReply({ embeds: [embed] })
      }
      if (!title5) {
        return
      } else {
        const str = `**${game1}\n\n${game2}\n\n${game3}\n\n${game4}\n\n${game5}**`

        embed.setDescription(str)

        await interaction.editReply({ embeds: [embed] })
      }
      if (!title6) {
        return
      } else {
        const str = `**${game1}\n\n${game2}\n\n${game3}\n\n${game4}\n\n${game5}\n\n${game6}**`

        embed.setDescription(str)

        await interaction.editReply({ embeds: [embed] })
      }
    }

    const cmd = await commandListSchema.findOne({ User: interaction.user.id })
    const ggive = 1

    if (cmd.free + ggive) {
      cmd.free += ggive
      await cmd.save()
    } else {
      cmd.free = + ggive
      cmd.save()
    }
  }
}