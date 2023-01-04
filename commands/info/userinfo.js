const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require('moment')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Info about anyone')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Target to get info on this user')
        ),
        category: 'Info',
        cooldown: 0,
    async execute(interaction) {
        let target = interaction.options.getUser('target') || interaction.user;
        let member = interaction.guild.members.cache.get(target.id)

        const embed = new EmbedBuilder()
            .setTitle(`${target.username}`)
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .setDescription(`
            User ID: ${target.id}
            Roles: ${member.roles.cache.map(r => r).join(" ").replace("@everyone", "ㅤ")}
            Discord User Since: ${moment(target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(target.createdAt).startOf('day').fromNow()}
            Server Member Since: ${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.joinedAt).startOf('day').fromNow()}
        `)
            .setColor('#2f3136')

        interaction.reply({ embeds: [embed] })
    }
}