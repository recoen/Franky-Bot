const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help to find all commands')
        .addSubcommand(
            subcommand => subcommand
                .setName('home')
                .setDescription('to see what buttons do')
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('fun')
                .setDescription('all Fun commands')
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('music')
                .setDescription('all music commands')
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('economy')
                .setDescription('all economy commands')
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('info')
                .setDescription('all info commands')
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('nsfw')
                .setDescription('all nsfw commands')
        )
        .addSubcommand(
            subcommand => subcommand
                .setName('tools')
                .setDescription('all tool commands')
        ),
    category: 'Tools',
    cooldown: 0,
    async execute(interaction, client) {
        //other
        const sub = interaction.options.getSubcommand()
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
                    .setCustomId('economy')
                    .setEmoji('🪙')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('info')
                    .setEmoji('🔍')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('tools')
                    .setEmoji('⛏️')
                    .setStyle(ButtonStyle.Success),
            );
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('nsfw')
                    .setEmoji('🔞')
                    .setStyle(ButtonStyle.Danger)
            )

        //Embeds
        const help = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Help at your service')
            .setDescription(`Click the bottons to get help\nbtw if the buttons dont work, just use the sub commands eg '/help fun'\n🤣 - Fun Command List\n🪙 - Economy Command List\n🔍 - Info Command List\n⛏️ - Tools Command List\n🎵 - Music Command List\n🔞 - NSFW Command List`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const fun = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Fun Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Fun').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const nsfw = new EmbedBuilder()
            .setColor('Red')
            .setTitle('nsfw Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'nsfw').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const info = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Info Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Info').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const economy = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('Economy Commands')
            .setDescription(`${client.commands.filter(cmd => cmd.category === 'Economy').map(cmd => `**/${cmd.data.name}** | ${cmd.data.description}`).join(' \n')}`)
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

        if (sub === 'home') {
            interaction.reply({ embeds: [help], components: [row, row2] })
        }

        if (sub === 'fun') {
            interaction.reply({ embeds: [fun], components: [row, row2] })
        }

        if (sub === 'music') {
            interaction.reply({ embeds: [music], components: [row, row2] })
        }

        if (sub === 'economy') {
            interaction.reply({ embeds: [economy], components: [row, row2] })
        }

        if (sub === 'info') {
            interaction.reply({ embeds: [info], components: [row, row2] })
        }

        if (sub === 'tools') {
            interaction.reply({ embeds: [tools], components: [row, row2] })
        }

        if (sub === 'nsfw') {
            interaction.reply({ embeds: [nsfw], components: [row, row2] })
        }

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            if (i.customId === 'fun') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use these buttons`, ephemeral: true })
                }
                return i.update({ embeds: [fun], components: [row, row2] })
            }
            if (i.customId === 'info') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [info], components: [row, row2] })
            }
            if (i.customId === 'economy') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [economy], components: [row, row2] })
            }
            if (i.customId === 'tools') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [tools], components: [row, row2] })
            }
            if (i.customId === 'music') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [music], components: [row, row2] })
            }
            if (i.customId === 'nsfw') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [nsfw], components: [row, row2] })
            }
        })
    }
}
