const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help to find all commands'),

    async execute(interaction) {
        //buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('fun')
                    .setLabel('Fun')
                    .setEmoji('🤣')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('mod')
                    .setLabel('Mod')
                    .setEmoji('🔨')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('owner')
                    .setLabel('Owner')
                    .setEmoji('👑')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('info')
                    .setLabel('Info')
                    .setEmoji('🔍')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('tools')
                    .setLabel('Tools')
                    .setEmoji('⛏️')
                    .setStyle(ButtonStyle.Success),
            );
            const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('nsfw')
                .setLabel('NSFW')
                .setEmoji('🔞')
                .setStyle(ButtonStyle.Danger)
            )

        //Embeds
        const help = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Help at your serices')
            .setDescription(`
                What would you like to use
                Click the bottons to get help
            `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const fun = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Fun Commands')
            .setDescription(`
                </69420:1045965459759038554>
                </8ball:1040501336581611550>
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
                </userinfo:1046330448072147025>
            `)
            .setFooter({ text: `${interaction.guild.name}` })
            .setTimestamp()

        const mod = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Moderaction Commands')
            .setDescription(`
                </ban:1045952816553934898>
                </kick:1046300016567910420>
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

        await interaction.reply({ embeds: [help], components: [row, row2]})

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            if(i.customId === 'fun') {
                if(i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                }
                return i.update({ embeds: [fun], components: [row, row2] })
            }
            if(i.customId === 'info') {
                if(i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true})
                }
                return i.update({ embeds: [info], components: [row, row2] })
            }
            if(i.customId === 'mod') {
                if(i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true})
                }
                return i.update({ embeds: [mod], components: [row, row2] })
            }
            if(i.customId === 'owner') {
                if(i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true})
                }
                return i.update({ embeds: [owner], components: [row, row2] })
            }
            if(i.customId === 'tools') {
                if(i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true})
                }
                return i.update({ embeds: [tools], components: [row, row2] })
            }
            if(i.customId === 'nsfw') {
                if(i.user.id !== interaction.user.id) {
                    return i.reply({ content: `Only ${interaction.user.tag} can use this command`, ephemeral: true})
                }
                return i.update({ embeds: [nsfw], components: [row, row2] })
            }
        })
    }
}