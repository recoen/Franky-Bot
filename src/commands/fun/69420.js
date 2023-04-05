const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('69420')
        .setDescription('try to get the funny number'),
        category: 'Fun',
        cooldown: 0,
    async execute(interaction) {
        let number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let random1 = Math.floor(Math.random() * number.length);
        let random2 = Math.floor(Math.random() * number.length);
        let random3 = Math.floor(Math.random() * number.length);
        let random4 = Math.floor(Math.random() * number.length);
        let random5 = Math.floor(Math.random() * number.length);


        const embed = new EmbedBuilder()
            .setTitle("69420 challange, you got: ")
            .setDescription(`${number[random1]}${number[random2]}${number[random3]}${number[random4]}${number[random5]}`)
            .setColor("Yellow")
            .setTimestamp()

        interaction.reply({ embeds: [embed] })

        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.funnyNum + ggive) {
            cmd.funnyNum += ggive
            await cmd.save()
        } else {
            cmd.funnyNum = + ggive
            cmd.save()
        }
    }
}