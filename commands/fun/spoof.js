const { SlashCommandBuilder, WebhookClient } = require("discord.js");
const config = require('../../../config.json')

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

    async execute(interaction) {
        let hook = await interaction.channel.createWebhook({
            name: 'nuts',
            avatar: 'https://i.imgur.com/AfFp7pu.png'
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
        });
        if(createWebhook = true) {
            interaction.reply({ content: 'Spoof was seccessful', ephemeral: true})
        } else interaction.reply({content: 'Spoof did not work', ephemeral: true})
        
        const hooks1 = await interaction.guild.fetchWebhooks();
        await hooks1.forEach(async webhook => {
            if (!interaction.channel.id == webhook.channelID) {
                console.log(`**${interaction.username}**, Nothing was found. You or someone else may have renamed the webhook. Please delete the webhook manually. Sorry for the inconvenience`)
                return;
            }
            if (!webhook.owner.id == config.clientId) {
                console.log(`**${interaction.username}**, Nothing was found. You or someone else may have renamed the webhook. Please delete the webhook manually. Sorry for the inconvenience`)
                return;
            } else {
                webhook.delete(`Delete Requested By Discord Please follow`);
            }
        })
    }
}
