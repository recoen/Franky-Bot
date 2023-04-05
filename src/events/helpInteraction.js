const { Interaction, EmbedBuilder } = require('discord.js')
const serverSetupSchema = require('../Schema/serverSetupSchema')

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
            if (interaction.values[0] === 'music') {
                const music = new EmbedBuilder()
                    .setColor('Purple')
                    .setTitle('Music Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Music').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [music] })
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
            if (interaction.values[0] === 'text') {
                const info = new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle('Text Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Text').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
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
                const data = await serverSetupSchema.findOne({ Guild: interaction.guild.id })
                if (!data) {
                    const nsfw = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle('NSFW Commands')
                        .setDescription(`sorry, server has the nsfw disable, can not show the command list\nGet the Server Owner to run </nsfw-toggle:1081127288453734590> if you want nsfw enabled`)
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                    interaction.update({ embeds: [nsfw] })
                    serverSetupSchema.create({ Guild: interaction.guild.id, nsfwToggle: false })
                } else if (data.nsfwToggle === false) {
                    const nsfw = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle('NSFW Commands')
                        .setDescription(`sorry, server has the nsfw disable, can not show the command list\nGet the Server Owner to run </nsfw-toggle:1081127288453734590> if you want nsfw enabled`)
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                    interaction.update({ embeds: [nsfw] })
                } else {
                    const nsfw = new EmbedBuilder()
                        .setColor('Red')
                        .setTitle('NSFW Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'nsfw').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                    interaction.update({ embeds: [nsfw] })
                }
            }
            if (interaction.values[0] === 'image') {
                const image = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('Image Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Image').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [image] })
            }
            if (interaction.values[0] === 'setup') {
                const image = new EmbedBuilder()
                    .setColor('DarkGrey')
                    .setTitle('Setup Commands')
                    .setDescription(`${client.commands.filter(cmd => cmd.category === 'Setup').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                interaction.update({ embeds: [image] })
            }
        }
    }
}