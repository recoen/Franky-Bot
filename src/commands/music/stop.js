const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stops a song'),
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
            await player.destroy()
            interaction.reply({ embeds: [yes.setDescription('Music has been stopped')] })
        }
    }
}