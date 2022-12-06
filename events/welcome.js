const { EmbedBuilder } = require('discord.js')

module.exports = client => {
    client.on('guildMemberAdd', async member => {
        const channel = '1049174568654356550'

        const embed = new EmbedBuilder()
            .setTitle(`New Member Has Joined ${member.user.tag}`)
            .setDescription(`Hello there, Welcome to Franklins Brain we hope you enjoy it here :)\nPls read the rules <#945622118945660958>, then you can verify urself <#945624152423956491>\nMake sure you get some custom roles <#945639716689162290>, Enjoy :D`)
            .setTimestamp()

        channel.send({ embeds: [embed] })
    })
}