const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pixelate')
        .setDescription('Get a pixelated form of a users avatar')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Select a user')
        ),
        category: 'Tools',
        cooldown: 0,
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        let avatarUrl = user.avatarURL({ size: 512, extension: 'jpg' });
        let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Profile Picture`)
            .setImage(canvas)
            .setColor('#2f3136')
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    },
};