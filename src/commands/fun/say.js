const { SlashCommandBuilder } = require("discord.js");
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

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
        category: 'Fun',
        cooldown: 0,
    async execute(interaction) {
        const msg = interaction.options.getString('input')
        if(msg.includes('@')) {
            interaction.reply({ content: 'you can not mention people with this', ephemeral: true})
        } else {
            await interaction.reply({ content: `say was successful`, ephemeral: true})
            await interaction.channel.send(msg)
        }

        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.say + ggive) {
            cmd.say += ggive
            await cmd.save()
        } else {
            cmd.say = + ggive
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