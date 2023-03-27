const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dictionary')
        .setDescription('search a word in the dictionary')
        .addStringOption(
            option => option
                .setName('word')
                .setDescription('the word you want to search')
                .setRequired(true)
        ),
    catgoery: "Info",
    async execute(interaction) {

        const word = interaction.options.getString('word');

        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (data.statusText == 'Not Found') {
            return interaction.reply({ content: 'that word does not exist', ephemeral: true });
        }

        let info = await data.json();
        let result = info[0];

        let embedInfo = await result.meanings.map((data, index) => {

            let definition = data.definitions[0].definition || "No definition found";
            let example = data.definitions[0].example || "No example found";

            return {
                name: data.partOfSpeech.toUpperCase(),
                value: `\`\`\` Description: ${definition} \n Example: ${example} \`\`\``,
            };
        });

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`Definition of | **${result.word}**`)
            .addFields(embedInfo)

        await interaction.reply({ embeds: [embed] });
        const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.dictionary + ggive) {
            cmd.dictionary += ggive
            await cmd.save()
        } else {
            cmd.dictionary = + ggive
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
