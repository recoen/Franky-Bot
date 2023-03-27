const { SlashCommandBuilder } = require("discord.js");
const figlet = require('figlet')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('convert text to ascii')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('input text to convert')
                .setRequired(true)
                .setMaxLength(15)
        ),
        category: 'Fun',
        cooldown: 0,
    async execute(interaction) {
        const text = interaction.options.getString('text')

        figlet(`${text}`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            interaction.reply(`\`\`\`${data}\`\`\``)
        });

        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.ascii + ggive) {
            cmd.ascii += ggive
            await cmd.save()
        } else {
            cmd.ascii = + ggive
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