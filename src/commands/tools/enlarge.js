const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require('axios');
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('enlarge')
    .setDescription('make emojis bigger to save')
    .addStringOption(
        option => option
        .setName('emoji')
        .setDescription('put emojis here')
    ),
    async execute(interaction) {
        let emoji = interaction.options.getString('emoji')?.trim();
 
        if (emoji.startsWith('<') && emoji.endsWith('>')) {
 
            const id = emoji.match(/\d{15,}/g)[0];
 
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if (image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })
            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }
 
        if (!emoji.startsWith("http")) {
            return await interaction.reply({ content: 'must be a custom emoji', ephemeral: true})
        }
 
        if (!emoji.startsWith("https")) {
            return await interaction.reply({ content: 'must be a custom emoji', ephemeral: true})
        }
 
        const embed = new EmbedBuilder()
        .setColor('Orange')
        .setDescription('✅ **Your emoji has been enlarged!**')
        .setImage(emoji)
        .setTimestamp()
        .setFooter({ text: 'Emoji Enlarged', iconURL: interaction.user.displayAvatarURL()})
 
        await interaction.reply({ embeds: [embed] })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.enlarge + ggive) {
            cmd.enlarge += ggive
            await cmd.save()
        } else {
            cmd.enlarge = + ggive
            cmd.save()
        }
    }
}