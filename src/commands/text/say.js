const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const commandListSchema = require('../../Schema/commandListSchema')
const { wordList } = require('../../../bannedwords.json')
const serverSetupSchema = require("../../Schema/serverSetupSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('I will say anything you want')
        .addStringOption(option =>
            option
                .setName("input")
                .setDescription('anything u type here, i will say')
                .setRequired(true)
        ),
    category: 'Text',
    cooldown: 0,
    async execute(interaction, client) {
        const sdata = await serverSetupSchema.findOne({ Guild: interaction.guild.id })
        const msg = interaction.options.getString('input')

        let comfirm = false
        let i;
        for (i = 0; i < wordList.length; i++) {
            if (msg.includes(wordList[i])) {
                comfirm = true
            }
        }

        if (msg.includes('@')) {
            interaction.reply({ content: 'you can not mention people with this', ephemeral: true })
        } else if (msg.includes('http', '.com', '.org', '.gg', '.net')) {
            interaction.reply({ content: 'you can not use links with this', ephemeral: true })
        } else if (comfirm) {
            interaction.reply({ content: 'you can not say bad words', ephemeral: true })
        } else {
            if (!sdata) {
                serverSetupSchema.create({
                    Guild: interaction.guild.id,
                    frankyLogsEnabled: false,
                    nsfwToggle: false
                })
                await interaction.reply(msg)
            } else {
                if (sdata.frankyLogsEnabled == false) {
                    await interaction.reply(msg)
                } else {
                    const log = client.channels.cache.get(sdata.logChannelID)
                    if (!log) {
                        await interaction.reply(msg)
                    } else {
                        const embed = new EmbedBuilder()
                            .setTitle(`${client.user.username} Logs`)
                            .setDescription(`${interaction.user.tag} used \`/say\`\nchannel: ${interaction.channel}\nmessage: ${msg}`)
                            .setTimestamp()
                        await interaction.reply({ content: `say was Successful`, ephemeral: true })
                        await interaction.channel.send(msg)
                        log.send({ embeds: [embed] })
                    }
                }
            }
        }

        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.say + ggive) {
            cmd.say += ggive
            await cmd.save()
        } else {
            cmd.say = + ggive
            cmd.save()
        }
    }
}