const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('get all commands'),
    category: 'Tools',
    async execute(interaction, client) {
        const help = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Help at your service')
            .setDescription(`Use the dropdown to get the list of commands\n⚙️ - Setup Command List\n🤣 - Fun Command List\n🪙 - Economy Command List\n🔍 - Info Command List\n⛏️ - Tools Command List\n🎮 - Games Command List\n🔞 - NSFW Command List\n🖼️ - Image Command List\n🎵 - Music Command List`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions(
                        {
                            label: 'Setup',
                            description: 'Get all Setup commands',
                            value: 'setup',
                            emoji: '⚙️'
                        },
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
                            label: 'Text',
                            description: 'Get all Text commands',
                            value: 'text',
                            emoji: '🔤'
                        }
                    )
            )

        await interaction.reply({ embeds: [help], components: [row] })
        
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.help + ggive) {
            cmd.help += ggive
            await cmd.save()
        } else {
            cmd.help = + ggive
            cmd.save()
        }
    }
}