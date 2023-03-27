const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('changes the volume')
        .addIntegerOption(
            option => option
            .setName('value')
            .setDescription('enter and percentage')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(100)
        ),
    category: 'Music',
    async execute(interaction, client) {
        const value = interaction.options.getInteger('value')
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
            await player.setVolume(value)
            interaction.reply({ embeds: [yes.setDescription(`valume has been set to %${value}`)] })
        }
    }
}