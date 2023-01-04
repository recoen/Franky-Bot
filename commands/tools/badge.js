const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('badge')
        .setDescription('To know what badges you have.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The Perosn you want to target.')
        ),
        category: 'Tools',
        cooldown: 0,
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const flags = user.flags.toArray();
        const embed = new EmbedBuilder()
            .setTitle(user.username)
            .setDescription(`Badges: \n${flags.join('\n').replace('HypeSquadOnlineHouse1', 'HypeSquad Bravery').replace('HypeSquadOnlineHouse2', 'HypeSquad Brillance').replace('HypeSquadOnlineHouse3', 'HpyeSquad Balance').replace('ActiveDeveloper', 'Active Developer')}`)
            .setColor('#2f3136')
            await interaction.reply({ embeds: [embed] });
    }
}