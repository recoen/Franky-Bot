const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pauses the music')
        .addStringOption(
            option=> option
            .setName('toggle')
            .setDescription('pause')
            .setRequired(true)
            .addChoices(
                { name: 'Pause', value: 'true' }, 
                { name: 'Unpause', value: 'false' }
            )
        ),
    category: 'Music',
    async execute(interaction, client) {
        const toggle = interaction.options.getString('toggle')
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
            if(toggle === 'true') {
                await player.pause(true)
                interaction.reply({ embeds: [yes.setDescription(`Music has been paused`)] })
            } else {
                await player.pause(false)
                interaction.reply({ embeds: [yes.setDescription(`Music has been unpaused`)] })
            }
        }
    }
}