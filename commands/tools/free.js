const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { FreeStuffApi } = require("freestuff");
const config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("free")
    .setDescription("get a list of games that are 100% free"),
    cooldown: 0,
    category: 'Tools',
  async execute(interaction, client) {
    const fsapi = new FreeStuffApi({
      key: config.freeStuffAPIKey,
      cacheTtl: {
        gameList: 1000,
        gameDetails: 1000,
      },
    });
    const games = await fsapi.getGameList("free");
    const info = await fsapi.getGameDetails(games, "info");

    const title1 = Object.keys(info).map(stuff => info[stuff].title)[0]
    const url1 = Object.keys(info).map(stuff => info[stuff].urls.default)[0]
    const org_pirce1 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[0]
    const store1 = Object.keys(info).map(stuff => info[stuff].store)
    const until1 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[0]) / 1000)

    const title2 = Object.keys(info).map(stuff => info[stuff].title)[1]
    const url2 = Object.keys(info).map(stuff => info[stuff].urls.default)[1]
    const org_pirce2 = Object.keys(info).map(stuff => info[stuff].org_price.usd)[1]
    const store2 = Object.keys(info).map(stuff => info[stuff].store)
    const until2 = Math.round(new Date(Object.keys(info).map(stuff => info[stuff].until)[1]) / 1000)
    const str = `${config.emojis[store1] || '❔'}[${title1}](${url1})\n${config.emojis.nothing}~~$${org_pirce1}~~・until <t:${until1}:d>\n\n${config.emojis[store2] || '❔'}[${title2}](${url2})\n${config.emojis.nothing}~~$${org_pirce2}~~・until <t:${until2}:d>`

    const embed = new EmbedBuilder()
        .setTitle(`Frees game that are 100% off`)
        .setDescription(str)

    await interaction.reply({ embeds: [embed]})
  },
};
