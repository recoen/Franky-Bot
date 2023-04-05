const { SlashCommandBuilder, EmbedBuilder, ChannelType, GuildVerificationLevel, GuildExplicitContentFilter, GuildNSFWLevel } = require("discord.js");
const commandListSchema = require('../../Schema/commandListSchema')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Info on this server'),
    category: 'Info',
    cooldown: 0,
    async execute(interaction, client) {
        const { guild } = interaction
        const { name, ownerId, members, channels, createdTimestamp, description, emojis, stickers, hooks } = guild;
        const splitPascal = (string, separator) => string.split(/(?=[A-Z])/).join(separator);
        // axios.get(`https://discord.com/api/guilds/${interaction.guild.id}`, {
        //     headers: {
        //         Authorization: `Bot ${client.token}`
        //     }
        // }).then((res) => {
        //     const { banner } = res.data
        //     console.log(res.data)
        // })

        const serverinfo = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(name)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            
            .setFields(
                { name: "📱 | GENERAL", value: `- Name: ${guild.name}\n- Server ID: ${interaction.guild.id}\n- Created: <t:${parseInt(createdTimestamp / 1000)}:R>\n- Owner: <@${ownerId}>\n- Vanity URL: ${guild.vanityURLCode || 'none'}\n- Description: ${guild.description || 'none'}` },
                { name: "💡 | USERS", value: `- Members ${members.cache.filter((m) => !m.user.bot).size}\n- Bots: ${members.cache.filter((m) => m.user.bot).size}\n\nTotal Members ${interaction.guild.memberCount}\n🟢 ${guild.members.cache.filter(m => m.presence?.status == 'online').size} ⛔ ${guild.members.cache.filter(m => m.presence?.status == 'dnd').size} 🌙 ${guild.members.cache.filter(m => m.presence?.status == 'idle').size} ⚫ ${guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`, inline: false },
                { name: "🏢 | CHANNELS", value: `- Text: ${channels.cache.filter((c) => c.type === ChannelType.GuildText).size}\n- voice: ${channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}\n- threads: ${channels.cache.filter((c) => c.type === ChannelType.GuildPublicThread && ChannelType.GuildPrivateThread && ChannelType.GuildNewsThread).size}\n- Categories: ${channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}\n- Stages: ${channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}\n- News ${channels.cache.filter((c) => c.type === ChannelType.GuildNews).size}\n\nTotal Channels: ${channels.cache.size}`, inline: false },
                { name: "😀 | EMOJIS AND STICKERS", value: `- Animated: ${emojis.cache.filter((e) => e.animated).size}\n- Static: ${emojis.cache.filter((e) => !e.animated).size}\n- Stickers: ${stickers.cache.size}\n\nTotal ${stickers.cache.size + emojis.cache.filter((e) => !e.animated).size + emojis.cache.filter((e) => e.animated).size}`, inline: false },
                { name: "🛠️ | SECURITY", value: `- Explicit Filter: ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], " ")}\n- NSFW Level: ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}\n- Verification Level: ${splitPascal(GuildVerificationLevel[guild.verificationLevel], " ")}`, inline: false },
                { name: "✨ | NITRO STATISITCS", value: `- Tier: ${guild.premiumTier}\n- Boosts: ${guild.premiumSubscriptionCount}\n- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`, inline: false },
                { name: "🎈 | OTHER", value: `- Roles: ${guild.roles.cache.size}\n- Banner: ${guild.bannerURL() ? "** **" : "None"}`, inline: false },
            )
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })

        interaction.reply({ embeds: [serverinfo] })
        
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.serverinfo + ggive) {
            cmd.serverinfo += ggive
            await cmd.save()
        } else {
            cmd.serverinfo = + ggive
            cmd.save()
        }
    }
}