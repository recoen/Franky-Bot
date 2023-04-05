const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('display all songs in the qeue'),
    category: 'Music',
    async execute(interaction, client) {
        //embeds
        const no = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Error!')
        const yes = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Success!')
        //code
        const player = client.manager.players.get(interaction.guild.id)
        if (!player) {
            interaction.reply({ embeds: [no.setDescription('There is no music being played at the moment')] })
        } else if (!interaction.member.voice.channel) {
            interaction.reply({ embeds: [no.setDescription('You have to be in a Voice Channel')], ephemeral: true })
        } else if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.members.me.voice.channelId) {
            interaction.reply({ embeds: [no.setDescription('Im already in a Voice Channel, Join the VC im in please')], ephemeral: true })
        } else {
            let count = 0;
            let status;
        
            if (player.queue.length == 0) {
                status = "No more music in the queue";
            }
            else {
                status = player.queue.map((track) => {
                    count += 1;
                    return (`**#${count}**┆${track.title.length >= 45 ? `${track.title.slice(0, 45)}...` : track.title} (Requested by <@!${track.requester.id}>)`);
                }).join("\n");
            }
            const embed = new EmbedBuilder()
            .setTitle('The Queue')
            .setDescription(status)
            .addFields(
                {
                    name: `🎵 Current song:`,
                    value: `${player.queue.current.title} (Requested by <@!${player.queue.current.requester.id}>)`
                }
            )
            interaction.reply({ embeds: [embed]})
        }
    }
}