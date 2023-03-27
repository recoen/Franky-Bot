const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Decides your fate')
        .addStringOption(option =>
            option
                .setName('question')
                .setDescription('write your question here')
                .setRequired(true)
        ),
        category: 'Fun',
        cooldown: 0,
    async execute(interaction) {
        const replies = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."]
        const random = Math.floor(Math.random() * replies.length)
        let question = interaction.options.getString('question')

        const embed = new EmbedBuilder()
            .setTitle(`🎱 ${interaction.user.username}`)
            .setDescription(`question: ${question}\nReply: ${replies[random]}`)

        await interaction.reply({ embeds: [embed] });

        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.eightball + ggive) {
            cmd.eightball += ggive
            await cmd.save()
        } else {
            cmd.eightball = + ggive
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