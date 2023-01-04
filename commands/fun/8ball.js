const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
    }
}