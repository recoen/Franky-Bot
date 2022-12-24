const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('changes on Franky and upcoming updates'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Change Log and Upcoming Updates')
            .setDescription('Everything Franklin#8332 does to me, i put here :)')
            .addFields(
                {
                    name: 'Change Log',
                    value: 'Everything i have changed/add/removed'

                },
                {
                    name: 'added change log',
                    value: 'what can i put here?'
                },
                {
                    name: 'changed the say command',
                    value: 'no one knows who sent it'
                },
                {
                    name: 'added ascii',
                    value: 'converts text into a cool text'
                },
                {
                    name: 'added kill',
                    value: 'kill any user'
                }
            )
        interaction.reply({ embeds: [embed] })
    }
}