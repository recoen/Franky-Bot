const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const economyschema = require('../../schema/economySchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('checks how much money you have')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('see how much another person has')
        ),
        category: 'Economy',
        cooldown: 0,
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id)
        const Data = await economyschema.findOne({ User: member.id })

        if(!Data) return interaction.reply({ content: `sorry you have no money, send a message to get some`, ephemeral: true})

        const money = new EmbedBuilder()
            .setTitle(`${member.user.username}`)
            .setDescription(`You have $${Data.Money}`)

        await interaction.reply({ embeds: [money] })
    }
}