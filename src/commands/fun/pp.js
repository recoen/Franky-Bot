const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('How long is your pp?')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('Targets gay percentage')
    ),
    category: 'Fun',
    cooldown: 0,
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
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.pp + ggive) {
            cmd.pp += ggive
            await cmd.save()
        } else {
            cmd.pp = + ggive
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