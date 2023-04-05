const { SlashCommandBuilder, WebhookClient, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')
const { wordList } = require('../../../bannedwords.json')
const commandListSchema = require('../../Schema/commandListSchema');
const serverSetupSchema = require("../../Schema/serverSetupSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spoof')
        .setDescription('makes it look like your friend said something that they didnt say')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Who you spoofing?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('changes this text to emojis')
                .setRequired(true)
        ),
    category: 'Text',
    cooldown: 0,
    async execute(interaction, client) {
        let user = interaction.options.getUser('target')
        let msg = interaction.options.getString('text')

        const sdata = await serverSetupSchema.findOne({ Guild: interaction.guild.id })

        async function web() {
            let hook = await interaction.channel.createWebhook({
                name: 'Franky spoof Webhook',
                avatar: 'https://cdn.discordapp.com/avatars/992309600361660466/c94a39bc0a527cef6420ee150a3348e5.webp?size=512'
            })
            const idz = hook.id;
            const tok = hook.token;
            const webhookClient = new WebhookClient({ id: `${idz}`, token: `${tok}` });

            webhookClient.send({
                content: `${msg}`,
                username: `${user.username}`,
                avatarURL: `${user.displayAvatarURL({ dynamic: false })}`,
            }).then(webhookClient.delete())
        }

        const embed = new EmbedBuilder()
            .setTitle('Spoof was Successful')
            .setDescription(`${interaction.user} spoofed ${user}`)
            .setColor(config.color.embed)

        let comfirm = false
        let i;
        for (i = 0; i < wordList.length; i++) {
            if (msg.includes(wordList[i])) {
                comfirm = true
            }
        }

        if (msg.includes('@')) {
            interaction.reply({ content: 'you can not mention people with this', ephemeral: true })
        } else if (['http', '.com', '.org', '.gg', '.net'].includes(msg)) {
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
                web()
                interaction.reply({ embeds: [embed] })
            } else {
                if (sdata.frankyLogsEnabled == false) {
                    interaction.reply({ embeds: [embed] })
                    web()
                } else {
                    const log = client.channels.cache.get(sdata.logChannelID)
                    const embed2 = new EmbedBuilder()
                        .setTitle(`${client.user.username} Logs`)
                        .setDescription(`${interaction.user.tag} used \`/spoofed\`. ${user.tag} was spoofed and said ${msg}`)
                        .setColor(config.color.embed)
                    if (!log) {
                        await interaction.reply({ embeds: [embed2] })
                        web()
                    } else {
                        await interaction.reply({ content: `spoof was Successful`, ephemeral: true })
                        web()
                        log.send({ embeds: [embed2] })
                    }
                }
            }
        }

        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.spoof + ggive) {
            cmd.spoof += ggive
            await cmd.save()
        } else {
            cmd.spoof = + ggive
            cmd.save()
        }
    }
}