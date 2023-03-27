const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')
const serverSetupSchema = require('../../Schema/serverSetupSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('get all commands'),
    category: 'Tools',
    async execute(interaction, client) {
        try {
            const help = new EmbedBuilder()
                .setColor('Random')
                .setTitle('Help at your service')
                .setDescription(`Use the dropdown to get the list of commands\n🤣 - Fun Command List\n🪙 - Economy Command List\n🔍 - Info Command List\n⛏️ - Tools Command List\n🎮 - Games Command List\n🔞 - NSFW Command List\n🖼️ - Image Command List\n⚙️ - Setup Command List\n🎵 - Music Command List`)
                .setFooter({ text: `${interaction.guild.name}` })
                .setTimestamp()

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            {
                                label: 'Fun',
                                description: 'Get all Fun commands',
                                value: 'fun',
                                emoji: '🤣'
                            },
                            {
                                label: 'Music',
                                description: 'Get all Music commands',
                                value: 'music',
                                emoji: '🎵'
                            },
                            {
                                label: 'Economy',
                                description: 'Get all Economy commands',
                                value: 'economy',
                                emoji: '🪙'
                            },
                            {
                                label: 'Games',
                                description: 'Get all Game commands',
                                value: 'games',
                                emoji: '🎮'
                            },
                            {
                                label: 'Info',
                                description: 'Get all Info commands',
                                value: 'info',
                                emoji: '🔍'
                            },
                            {
                                label: 'Tools',
                                description: 'Get all Tools commands',
                                value: 'tools',
                                emoji: '⛏️'
                            },
                            {
                                label: 'Nsfw',
                                description: 'Get all NSFW commands',
                                value: 'nsfw',
                                emoji: '🔞'
                            },
                            {
                                label: 'Images',
                                description: 'Get all Images commands',
                                value: 'image',
                                emoji: '🖼️'
                            },
                            {
                                label: 'Setup',
                                description: 'Get all Setup commands',
                                value: 'setup',
                                emoji: '⚙️'
                            }
                        )
                )

            interaction.reply({ embeds: [help], components: [row] })

            const collector = await interaction.channel.createMessageComponentCollector();
            collector.on('collect', async i => {
                if (i.values[0] === 'fun') {
                    const fun = new EmbedBuilder()
                        .setColor('Yellow')
                        .setTitle('Fun Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Fun').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [fun] })
                }
                if (i.values[0] === 'music') {
                    const music = new EmbedBuilder()
                        .setColor('Purple')
                        .setTitle('Music Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Music').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [music] })
                }
                if (i.values[0] === 'games') {
                    const games = new EmbedBuilder()
                        .setColor('DarkerGrey')
                        .setTitle('Game Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Games').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [games] })
                }
                if (i.values[0] === 'economy') {
                    const economy = new EmbedBuilder()
                        .setColor('Gold')
                        .setTitle('Economy Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Economy').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [economy] })
                }
                if (i.values[0] === 'info') {
                    const info = new EmbedBuilder()
                        .setColor('Grey')
                        .setTitle('Info Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Info').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [info] })
                }
                if (i.values[0] === 'tools') {
                    const tools = new EmbedBuilder()
                        .setColor('LightGrey')
                        .setTitle('Tools Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Tools').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [tools] })
                }
                if (i.values[0] === 'nsfw') {
                    const data = await serverSetupSchema.findOne({ Guild: i.guild.id })
                    if (!data) {
                        const nsfw = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('NSFW Commands')
                            .setDescription(`sorry, server has the nsfw disable, can not show the command list`)
                            .setFooter({ text: `${i.guild.name}` })
                            .setTimestamp()
                        i.update({ embeds: [nsfw] })
                        serverSetupSchema.create({ Guild: i.guild.id, nsfwToggle: false })
                    } else if (data.nsfwToggle === false) {
                        const nsfw = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('NSFW Commands')
                            .setDescription(`sorry, server has the nsfw disable, can not show the command list`)
                            .setFooter({ text: `${i.guild.name}` })
                            .setTimestamp()
                        i.update({ embeds: [nsfw] })
                    } else {
                        const nsfw = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('NSFW Commands')
                            .setDescription(`${client.commands.filter(cmd => cmd.category === 'nsfw').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                            .setFooter({ text: `${i.guild.name}` })
                            .setTimestamp()
                        i.update({ embeds: [nsfw] })
                    }
                }
                if (i.values[0] === 'image') {
                    const image = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle('Image Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Image').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [image] })
                }
                if (i.values[0] === 'setup') {
                    const image = new EmbedBuilder()
                        .setColor('DarkGrey')
                        .setTitle('Setup Commands')
                        .setDescription(`${client.commands.filter(cmd => cmd.category === 'Setup').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
                        .setFooter({ text: `${i.guild.name}` })
                        .setTimestamp()
                    i.update({ embeds: [image] })
                }
            })
        } catch (e) {
            return
        }
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.help + ggive) {
            cmd.help += ggive
            await cmd.save()
        } else {
            cmd.help = + ggive
            cmd.save()
        }

        if (cdata.TotalCmd + ggive) {
            cdata.TotalCmd += ggive
            await cdata.save()
        } else {
            cdata.TotalCmd = + ggive
            cdata.save()
        }
    }
}