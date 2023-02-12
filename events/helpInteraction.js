const { Interaction, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isStringSelectMenu()) {
            if (interaction.values[0] === 'fun') {
                const fun = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle('Fun Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Fun').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [fun] })
            }
            if (interaction.values[0] === 'games') {
                const games = new EmbedBuilder()
                    .setColor('DarkerGrey')
                    .setTitle('Game Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Games').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [games] })
            }
            if (interaction.values[0] === 'economy') {
                const economy = new EmbedBuilder()
                    .setColor('Gold')
                    .setTitle('Economy Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Economy').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [economy] })
            }
            if (interaction.values[0] === 'info') {
                const info = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle('Info Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Info').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [info] })
            }
            if (interaction.values[0] === 'tools') {
                const tools = new EmbedBuilder()
                    .setColor('LightGrey')
                    .setTitle('Tools Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Tools').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [tools] })
            }
            if (interaction.values[0] === 'nsfw') {
                const nsfw = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('nsfw Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'nsfw').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [nsfw] })
            }
        }
    }
}