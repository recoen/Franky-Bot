const { SlashCommandBuilder, WebhookClient } = require("discord.js");
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spoof')
        .setDescription('makes it look like your friend said something bad')
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
        category: 'Fun',
        cooldown: 0,
    async execute(interaction) {
        let hook = await interaction.channel.createWebhook({
            name: 'Franky spoof Webhook',
            avatar: 'https://cdn.discordapp.com/avatars/992309600361660466/c94a39bc0a527cef6420ee150a3348e5.webp?size=512'
        })
        let user = interaction.options.getUser('target')
        const idz = hook.id;
        const tok = hook.token;
        const webhookClient = new WebhookClient({ id: `${idz}`, token: `${tok}` });

        msg = interaction.options.getString('text')
        webhookClient.send({
            content: `${msg}`,
            username: `${user.username}`,
            avatarURL: `${user.displayAvatarURL({ dynamic: true })}`,
        }).then(webhookClient.delete())

        if(createWebhook = true) {
            interaction.reply({ content: 'Spoof was seccessful', ephemeral: true})
        } else interaction.reply({content: 'Spoof did not work', ephemeral: true})

        
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.spoof + ggive) {
            cmd.spoof += ggive
            await cmd.save()
        } else {
            cmd.spoof = + ggive
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