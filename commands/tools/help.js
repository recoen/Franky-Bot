const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help to find all commands'),
        category: 'Tools',
        cooldown: 0,
    async execute(interaction, client) {
        //buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('fun')
                    .setEmoji('🤣')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('music')
                    .setEmoji('🎵')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('owner')
                    .setEmoji('👑')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('info')
                    .setEmoji('🔍')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('tools')
                    .setEmoji('⛏️')
                    .setStyle(ButtonStyle.Success),
            );

        //Embeds
        const help = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Help at your service')
            .setDescription(`
                 Click the bottons to get help
                 btw if the buttons dont work, just use the sub commands eg '/help fun'
                 🤣 - Fun Command List
                 👑 - Owner Command List
                 🔍 - Info Command List
                 ⛏️ - Tools Command List
                 🎵 - Music Command List
             `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const fun = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Fun Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Fun').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const info = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Info Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Info').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const owner = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('Owner Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Owner').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const tools = new EmbedBuilder()
            .setColor('LightGrey')
            .setTitle('Tools Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Tools').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

            const music = new EmbedBuilder()
            .setColor('Purple')
            .setTitle('Music Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Music').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        await interaction.reply({ embeds: [help], components: [row] })

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            if (i.customId === 'fun') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use these buttons`, ephemeral: true })
                }
                return i.update({ embeds: [fun], components: [row] })
            }
            if (i.customId === 'info') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [info], components: [row] })
            }
            if (i.customId === 'owner') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [owner], components: [row] })
            }
            if (i.customId === 'tools') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [tools], components: [row] })
            }
            if (i.customId === 'music') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [music], components: [row] })
            }
        })
    }
}