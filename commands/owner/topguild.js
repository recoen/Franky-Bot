const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('topguilds')
    .setDescription('Shows the top guilds the bot is in (OWNER ONLY)'),

    async execute(interaction, client) {
        if(!['692197998939209789', '1009220856188240012'].includes(interaction.user.id)) return interaction.reply({ content: `you can't use this command only the the dev can use it`, ephemeral: true})
        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(10);

        const description = guilds
        .map((guild, index) => {
            return `${index + 1}) ${guild.name} -> ${guild.memberCount} members`;
        })
        .join("\n");

        
        const embed = new EmbedBuilder()
            .setTitle('Top Guilds')
            .setDescription(`Place | Name | Members\n` + description + `\n\nAll Member: ${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)}\nAll Servers: ${client.guilds.cache.size}`)
            .setColor('#2f3136')

        interaction.reply({embeds: [embed]})
    }
}