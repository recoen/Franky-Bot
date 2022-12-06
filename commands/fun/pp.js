const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('How long is your pp?')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('Targets gay percentage')
    ),

    async execute(interaction) {
        let user = interaction.options.getUser('target') || interaction.user;
        let random = Math.floor(Math.random() * 10) + 1
        let size = "";

        for(let i = 0; i < random; i++){
            size += "=";
        }
   
        let pp = "8" + size + "D";
        let description = user.tag + " ppsize: " + pp;

        const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s pp`)
        .setColor('LuminousVividPink')
        .setDescription(description)
        .setTimestamp()
        interaction.reply({embeds: [embed] })
    }
}