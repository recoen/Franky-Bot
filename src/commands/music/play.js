const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(
            option => option
                .setName('search')
                .setDescription('search for a song')
                .setRequired(true)
        ),
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
        const search = interaction.options.getString('search')
        let res

        if (!interaction.member.voice.channel) {
            interaction.reply({ embeds: [no.setDescription('You have to be in a Voice Channel')], ephemeral: true })
        } else if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.members.me.voice.channelId) {
            interaction.reply({ embeds: [no.setDescription('Im already in a Voice Channel, Join the VC im in please')], ephemeral: true })
        } else {
            const player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                selfDeafen: true
            })

            if (player.state != 'CONNECTED') await player.connect()

            try {
                res = await player.search(search, interaction.user)

                if (res.loadType === 'LOAD_FAILED') {
                    if (!player.queue.current) player.destroy()
                    return interaction.reply({ embeds: [no.setDescription('There was an error loading the song, pls try again later')] })
                
                } else if (res.loadType === 'NO_MATCHES') {
                    if (!player.queue.current) player.destroy()
                    return interaction.reply({ embeds: [no.setDescription(`There was no songs matching the description of \`${search}\``)] })
                
                } else if (res.loadType === 'PLAYLIST_LOADED') {
                    player.queue.add(res.tracks)
                    if (!player.playing && !player.paused && !player.queue.size) await player.play()
                    return interaction.reply({ embeds: [yes.setDescription('Playlist has been added to queue')] })
                
                } else if (res.loadType === 'TRACK_LOADED' || 'SEARCH_RESULT') {
                    player.queue.add(res.tracks[0])
                    if (!player.playing && !player.paused && !player.queue.size) await player.play()
                    return interaction.reply({ embeds: [yes.setDescription(`Song has been added to queue`)] })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}