const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nick')
    .setDescription('Change your Nickname')
    .addStringOption(option => 
        option
        .setName('nickname')
        .setDescription('What are you changing your nickname to?')
        .setRequired(true)
    ),
    category: 'Tools',
    cooldown: 0,
    async execute(interaction) {
        let nickname = interaction.options.getString('nickname');
        if (!nickname) reason = "No nickname was provided."


        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Nickname Changed By: ${interaction.user.username}`)
        .setDescription(`✅ ${interaction.user} I have changed your Nickname to **${nickname}**.`)
        .setTimestamp()

    interaction.member.setNickname(`${nickname}`).catch(error => console.log(error))
    await interaction.reply({ embeds: [embed] }).catch(error => console.log(error))
    },
}