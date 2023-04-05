const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const got = require('got');
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('send you memes'),
        category: 'Fun',
        cooldown: 0,
    async execute(interaction) {
        const embed = new EmbedBuilder()
        const subreddits = ['meme', 'memes'];
        got(`https://www.reddit.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/random/.json`).then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;

            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('Blue')
            embed.setFooter({text:`👍 ${memeUpvotes} | 💬 ${memeNumComments}`})
            interaction.reply({ embeds: [embed] })
        })

        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.meme + ggive) {
            cmd.meme += ggive
            await cmd.save()
        } else {
            cmd.meme = + ggive
            cmd.save()
        }
    }
}