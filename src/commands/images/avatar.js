const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Grabs the users profile so u can use it')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('grabs this user')
        ),
        category: 'Image',
        cooldown: 0,
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Profile Picture`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(config.color.embed)
            .setTimestamp()

        interaction.reply({ embeds: [embed] })
        
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.avatar + ggive) {
            cmd.avatar += ggive
            await cmd.save()
        } else {
            cmd.avatar = + ggive
            cmd.save()
        }
    }
}