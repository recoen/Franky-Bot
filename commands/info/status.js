const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('shows the status'),
    async execute(interaction, client) {
        if (!interaction.guild) return interaction.reply({ content: ":right: You cannot use the command here!", ephemeral: true })

        const ToTalSeconds = (client.uptime / 1000);
        const Days = Math.floor(ToTalSeconds / 86400);
        const Hours = Math.floor(ToTalSeconds / 3600);
        const Minutes = Math.floor(ToTalSeconds / 60);



        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Franky | Official Bot Stats")
            .addFields(
                { name: ':chart_with_upwards_trend: Uptime ', value: `┕\`${Days}d, ${Hours}h, ${Minutes}m\``, inline: false },
                { name: ':books: DJS Version', value: `┕\`v14.7.1\``, inline: false },
                { name: ':receipt: NodeJS Version', value: `┕\`v19.1.0\``, inline: false },
                { name: `:file_cabinet: API Latency`, value: `┕\`${Math.round(client.ws.ping)}\``, inline: false },
            )
            .setTimestamp()
            .setFooter({ text: `Stats Requested By: ${interaction.user.tag}` })



        interaction.reply({ embeds: [embed] }).catch(err => { interaction.reply('Error - Official Bot Stats') });
    }
}