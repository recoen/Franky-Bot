const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../../config.json')
const commandListSchema = require('../../Schema/commandListSchema')

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
        if (question.includes('Developer Mode' || 'developer dode')) {
            interaction.reply({ content: 'you can not use Developer Mode', ephemeral: true})
        } else {
            await interaction.deferReply();
            try {
                const res = await openai.createCompletion({
                    model: 'text-davinci-003',
                    max_tokens: 2048,
                    temperature: 0.5,
                    prompt: question
                })

                const embed = new EmbedBuilder()
                    .setTitle(`> ${question}`)
                    .setColor("Blue")
                    .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

                await interaction.editReply({ embeds: [embed] });

            } catch (e) {
                console.log(e)
                return await interaction.editReply({ content: `Request failed with status code **${e.response.status}**`, ephemeral: true }); 
            }
        }


        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.chatgpt + ggive) {
            cmd.chatgpt += ggive
            await cmd.save()
        } else {
            cmd.chatgpt = + ggive
            cmd.save()
        }
    }
}