const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../../config.json')

const configuration = new Configuration({
    apiKey: config.apiKey.openai
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Ask chatgpt a question")
        .addStringOption(
            option => option
                .setName("question")
                .setDescription("This is going to be the question for chatgpt")
                .setRequired(true)
        ),
        catgoery: "Tools",
    async execute(interaction) {
        const question = interaction.options.getString("question");

        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })

            const embed = new EmbedBuilder()
                .setTitle(`${interaction.user.username} asked ` + question)
                .setColor("Blue")
                .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.reply({ embeds: [embed] });

        } catch (e) {
            return await interaction.reply({ content: `Request failed with status code **${e.response.status}**`, ephemeral: true })
        }
    }
}