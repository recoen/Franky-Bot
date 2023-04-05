const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const moment = require('moment')
const { profileImage } = require('discord-arts')
const em = require('../../emoji.json')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

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
        const profileBuffer = await profileImage(member.id);
        const imageAttachment = new AttachmentBuilder(profileBuffer, { name: 'profile.png' })
        let flags = target.flags.toArray();
        const cdata = await userinfoSchema.findOne({ User: target.id })
        const cmd = await commandListSchema.findOne({ User: target.id })
        const favCmd = [cmd.ass, cmd.userinfo, cmd.serverinfo]
        const userinfo = Object.keys(cmd).map(stuff => cmd[stuff].userinfo)

        //console.log(userinfo.copyWithin(Number))


        const embed = new EmbedBuilder()
            .setTitle(`Info About ${target.tag}`)
            .addFields(
                {
                    name: '📱General',
                    value: `
                    **Name:** ${target.username}\n**Discriminator:** ${target.discriminator}\n**ID:** ${target.id}\n**Badges:** ${flags.join(' ').replace('HypeSquadOnlineHouse1', em.badges.bravery).replace('HypeSquadOnlineHouse2', em.badges.brillance).replace('HypeSquadOnlineHouse3', em.badges.balance).replace('ActiveDeveloper', em.badges.activeDeveloper).replace('Staff', em.badges.staff).replace('Partner', em.badges.partner).replace('HypeSquad', em.badges.hypeSquad).replace('PremiumEarlySupporter', em.badges.premiumEarlySupporter).replace('BugHunterLevel1', em.badges.BugHunter1).replace('BugHunterLevel2', em.badges.BugHunter2).replace('VerifiedBot', em.badges.verifiedBot).replace('CertifiedModerator', em.badges.CertifiedMod) || 'No Bagdes'}\n**Discord User Since:** <t:${parseInt(target.createdTimestamp / 1000)}:R>\n**Server Member Since:** <t:${parseInt(member.joinedAt / 1000)}:R>`
                },
                {
                    name: `🤖Bot Side`,
                    value: `**Total Msgs:** ${cdata.TotalMsg}\n**Total Cmds Used:** ${cdata.TotalCmd + 1}\n**Fav Cmd:** ${Math.max(favCmd)}`
                }
            )
            .setImage('attachment://profile.png')
            //.setColor('#2f3136')
            .setTimestamp()

        interaction.reply({ embeds: [embed], files: [imageAttachment] })


        const ggive = 1

        if (cmd.userinfo + ggive) {
            cmd.userinfo += ggive
            await cmd.save()
        } else {
            cmd.userinfo = + ggive
            cmd.save()
        }
    }
}