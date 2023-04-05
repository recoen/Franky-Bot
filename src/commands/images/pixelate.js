const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pixelate')
        .setDescription('Get a pixelated form of a users avatar')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Select a user')
        ),
        category: 'Image',
        cooldown: 0,
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        let avatarUrl = user.avatarURL({ size: 512, extension: 'jpg' });
        let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Profile Picture`)
            .setImage(canvas)
            .setColor(config.color.embed)
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
        
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.pixelate + ggive) {
            cmd.pixelate += ggive
            await cmd.save()
        } else {
            cmd.pixelate = + ggive
            cmd.save()
        }
    }
}