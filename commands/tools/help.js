const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help to find all commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('fun commands')
        ),

    async execute(interaction) {
        //buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('fun')
                    .setEmoji('🤣')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('owner')
                    .setEmoji('👑')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('nsfw')
                    .setEmoji('🔞')
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
                 🔞 - NSFW Command List
             `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const fun = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Fun Commands')
            .setDescription(`
                 </69420:1045965459759038554>
                 </8ball:1040501336581611550>
                 </ascii:1051741109761622067>
                 </emojify:1045977345556742184>
                 </howgay:1045979051946410054>
                 </meme:1045983276432633887>
                 </nitro:1045986786373013514>
                 </pp:1045988496361394206>
                 </say:1048519151028813845>
                 </spoof:1046219974273925161>
             `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const info = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Info Commands')
            .setDescription(`
                 </serverinfo:1046335991599865957>
                 </status:1049150854655123528>
                 </userinfo:1046330448072147025>
             `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()
        const owner = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('Owner Commands')
            .setDescription(`
                 </topguild:1046316212411441222>
             `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const tools = new EmbedBuilder()
            .setColor('LightGrey')
            .setTitle('Tools Commands')
            .setDescription(`
                 </avatar:1048511539059113994>
                 </badge:1051649702799609916>
                 </help:1047280810404880475>
                 </nick:1046302080714932314>
             `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const nsfw = new EmbedBuilder()
            .setColor('Red')
            .setTitle('NSFW Commands')
            .setDescription(`
                 </4k:1048784729387839498>
                 </anal:1048879089341169744>
                 </ass:1048784729387839499>
                 </gonewild:1048879089341169747>
                 </hentai:1048875757264437269>
                 </hentaiass:1048879089341169748>
                 </porngif:1048879089341169750>
                 </pussy:1048775645687185428>
                 </thigh:1048879089341169751>
             `)
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
            if (i.customId === 'nsfw') {
                if (i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true })
                }
                return i.update({ embeds: [nsfw], components: [row] })
            }
        })
    }
}