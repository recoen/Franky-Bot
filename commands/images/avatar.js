const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Grabs the users profile so u can use it')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('grabs this user')
        ),
        category: 'Image',
        cooldown: 0,
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Profile Picture`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('#2f3136')
            .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}