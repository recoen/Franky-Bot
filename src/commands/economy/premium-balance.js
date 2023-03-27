const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('premium-balance')
        .setDescription('Shows how much money you have on sunrod')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('get someones balance')
        ),
        cooldown: 0,
    async execute(interaction, client) {
        const user = interaction.options.getUser('target') || interaction.user; return interaction.reply('❌ No user was found');

        const data = await client.sunrod.get({ user: user.id, bypass: true });

        if (!data || data.result !== 0) {
            interaction.reply(':x: We are sorry but there was a problem with our system... Try again later or contact us in our server.');
            return console.log(`SunRodAPI gave an error: result code was ${data.result}.`);
        }
        interaction.reply(`**${user.tag}** has exactly __${data.data} coins__!`)
    }
}