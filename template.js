const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('')
    .setDescription(''),
    category: '', //name of folder kinda, used for /help command
    cooldown: '1000', // 1000 = 1 second, how many times the user can run the command
    devOnly: false, //true or false, only u can run this command
    ownerOnly: false, //true or false, only the server owner can run this command
    async execute(interaction, client) {
        //CODE HERE
    }
}