const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('get all commands'),
        category: 'Tools',
    async execute(interaction) {
        const help = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Help at your service')
            .setDescription(`Click the bottons to get help\n🤣 - Fun Command List\n🪙 - Economy Command List\n🔍 - Info Command List\n⛏️ - Tools Command List\n🎮 - Games Command List\n🔞 - NSFW Command List`)
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
                            description: 'Get all Nsfw commands',
                            value: 'nsfw',
                            emoji: '🔞'
                        }
                    )
            )

        interaction.reply({ embeds: [help], components: [row]})
    }
}