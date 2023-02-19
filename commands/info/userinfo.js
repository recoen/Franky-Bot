const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require('moment')
const em = require('../../emoji.json')

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
        let flags = target.flags.toArray();

        const embed = new EmbedBuilder()
            .setTitle(`Info About ${target.username}`)
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .setDescription(`
            **Name:** ${target.username}
            **Discriminator:** ${target.discriminator}
            **ID:** ${target.id}
            **Badges:** ${flags.join(' ')
                    .replace('HypeSquadOnlineHouse1', em.badges.bravery)
                    .replace('HypeSquadOnlineHouse2', em.badges.brillance)
                    .replace('HypeSquadOnlineHouse3', em.badges.balance)
                    .replace('ActiveDeveloper', em.badges.activeDeveloper)
                    .replace('Staff', em.badges.staff)
                    .replace('Partner', em.badges.partner)
                    .replace('HypeSquad', em.badges.hypeSquad)
                    .replace('PremiumEarlySupporter',em.badges.premiumEarlySupporter)
                    .replace('BugHunterLevel1', em.badges.BugHunter1)
                    .replace('BugHunterLevel2', em.badges.BugHunter2)
                    .replace('VerifiedBot', em.badges.verifiedBot)
                    .replace('CertifiedModerator', em.badges.certifiedMod)
                || 'null'}
            **Discord User Since:** ${moment(target.createdAt).format('MMMM Do YYYY')} - ${moment(target.createdAt).startOf('day').fromNow()}
            **Server Member Since:** ${moment(member.joinedAt).format('MMMM Do YYYY')} - ${moment(member.joinedAt).startOf('day').fromNow()}
        `)
            .setColor('#2f3136')
            .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}
