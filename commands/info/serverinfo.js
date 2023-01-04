const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Info on this server'),
        category: 'Info',
        cooldown: 0,
    async execute(interaction) {
        const { guild } = interaction
        const { name, ownerId, members, channels, createdTimestamp, description, emojis, stickers, hooks } = guild;
        const serverinfo = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(name)
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addFields(
            {name: "📱 | GENERAL", value: `Name: ${guild.name}\nServer ID: ${interaction.guild.id}\nCreated: <t:${parseInt(createdTimestamp / 1000)}:R>\nOwner: <@${ownerId}>\nDescription: ${guild.description}`},
            {name: "💡 | USERS", value: `- Members ${members.cache.filter((m) => !m.user.bot).size}\n- Bots: ${members.cache.filter((m) => m.user.bot).size}\n\nTotal Members ${interaction.guild.memberCount}\n🟢 ${guild.members.cache.filter(m => m.presence?.status == 'online').size} ⛔ ${guild.members.cache.filter(m => m.presence?.status == 'dnd').size} 🌙 ${guild.members.cache.filter(m => m.presence?.status == 'idle').size} ⚫ ${guild.members.cache.filter(m => m.presence?.status == 'offline' || !m.presence).size}`},
            {name: "🏢 | CHANNELS", value: `- Text: ${channels.cache.filter((c) => c.type === ChannelType.GuildText).size}\n- voice: ${channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}\n- threads: ${channels.cache.filter((c) => c.type === ChannelType.GuildPublicThread && ChannelType.GuildPrivateThread && ChannelType.GuildNewsThread).size}\n- Categories: ${channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}\n- Stages: ${channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}\n- News ${channels.cache.filter((c) => c.type === ChannelType.GuildNews).size}\n\nTotal Channels: ${channels.cache.size}`},
            {name: "😀 | EMOJIS AND STICKERS", value: `- Animated: ${emojis.cache.filter((e) => e.animated).size}\n- Static: ${emojis.cache.filter((e) => !e.animated).size}\n- Stickers: ${stickers.cache.size}\n\nTotal ${stickers.cache.size + emojis.cache.filter((e) => !e.animated).size + emojis.cache.filter((e) => e.animated).size}`},
            {name: "🎈 | OTHER", value: `- Roles: ${guild.roles.cache.size}`},
            {name: "✨ | NITRO STATISITCS", value: `- Tier: ${guild.premiumTier}\n- Boosts: ${guild.premiumSubscriptionCount}\n- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`}
        )
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}`})
        
        interaction.reply({ embeds: [serverinfo] })
    }
}