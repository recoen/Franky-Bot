const { SlashCommandBuilder } = require("discord.js");
const figlet = require('figlet')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('convert text to ascii')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('input text to convert')
                .setRequired(true)
                .setMaxLength(25)
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
    }
}