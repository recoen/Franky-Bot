const { SlashCommandBuilder } = require("discord.js");
const figlet = require('figlet')
const commandListSchema = require('../../Schema/commandListSchema')
const { wordList } = require('../../../bannedwords.json')

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
    category: 'Text',
    cooldown: 0,
    async execute(interaction) {
        const text = interaction.options.getString('text')

        figlet(`${text}`, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }

            let comfirm = false
            let i;
            for (i = 0; i < wordList.length; i++) {
                if (text.includes(wordList[i])) {
                    comfirm = true
                }
            }

            if (comfirm) {
                interaction.reply({ content: 'you can not say bad words', ephemeral: true })
            } else {
                interaction.reply(`\`\`\`${data}\`\`\``)
            }

        });

        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.ascii + ggive) {
            cmd.ascii += ggive
            await cmd.save()
        } else {
            cmd.ascii = + ggive
            cmd.save()
        }
    }
}