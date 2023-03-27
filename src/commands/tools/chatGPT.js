const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const config = require('../../config.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
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
        await interaction.deferReply();
 
        const question = interaction.options.getString("question");
 
        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 1.5,
                prompt: question
            })
 
            const embed = new EmbedBuilder()
            .setTitle(`> ${question}`)
            .setColor("Blue")
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)
 
            await interaction.editReply({ embeds: [embed] });
 
        } catch(e) {
            return await interaction.editReply({ content: `Request failed with status code **${e.response.status}**`, ephemeral: true })
        }

        
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.chatgpt + ggive) {
            cmd.chatgpt += ggive
            await cmd.save()
        } else {
            cmd.chatgpt = + ggive
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