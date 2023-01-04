const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, VoiceChannel, GuildEmoji, CommandInteractionOptionResolver } = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("The Music System.")
        .addSubcommand(subcommand =>
            subcommand.setName("play")
                .setDescription("Play a song.")
                .addStringOption(option =>
                    option.setName("query")
                        .setDescription("Provide the name or url for the song.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("volume")
                .setDescription("Adjust the song volume.")
                .addNumberOption(option =>
                    option.setName("percent")
                        .setDescription("10 = 10%")
                        .setMinValue(1)
                        .setMaxValue(100)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("options")
                .setDescription("Select an option.")
                .addStringOption(option =>
                    option.setName("options")
                        .setDescription("Select an option.")
                        .setRequired(true)
                        .addChoices(
                            { name: "queue", value: "queue" },
                            { name: "skip", value: "skip" },
                            { name: "pause", value: "pause" },
                            { name: "resume", value: "resume" },
                            { name: "stop", value: "stop" },
                            { name: "shuffle", value: "shuffle" },
                            { name: "autoplay", value: "autoplay" },
                            { name: "loopsong", value: "loopsong" },
                            { name: "loopqueue", value: "loopqueue" },
                        )
                )
        ),
        category: 'Music',
        cooldown: 0,
    async execute(interaction) {
        const { options, member, guild, channel } = interaction;

        const subcommand = options.getSubcommand();
        const query = options.getString("query");
        const volume = options.getNumber("percent");
        const option = options.getString("options");
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed.setColor("Red").setDescription(("You must be in a voice channel to execute music command."));
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription((`You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>`));
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            switch (subcommand) {
                case "play":
                    client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
                    return interaction.reply({ content: "🎶 | Request recieved." });
                case "volume":
                    client.distube.setVolume(voiceChannel, volume);
                    return interaction.reply({ content: `🔉 | Volume has been set to ${volume}%.` });
                case "options":
                    const queue = await client.distube.getQueue(voiceChannel);

                    if (!queue) {
                        embed.setColor("Red").setDescription("There is no active queue.");
                        return interaction.reply({ embeds: [embed] });
                    }
                    switch (option) {
                        case "skip":
                            await queue.skip(voiceChannel);
                            embed.setColor("Blue").setDescription("⏩ | The song has been skipped.");
                            return interaction.reply({ embeds: [embed] });
                        case "stop":
                            await queue.stop(voiceChannel);
                            embed.setColor("Red").setDescription("⏹ | The song has been stopped.");
                            return interaction.reply({ embeds: [embed] });
                        case "pause":
                            await queue.pause(voiceChannel);
                            embed.setColor("Orange").setDescription("⏸ | The song has been paused.");
                            return interaction.reply({ embeds: [embed] });
                        case "resume":
                            await queue.resume(voiceChannel);
                            embed.setColor("Green").setDescription("⏯ | The song has been resumed.");
                            return interaction.reply({ embeds: [embed] });
                        case "queue":
                            embed.setColor("Purple").setTitle("**Server Queue**").setDescription(queue.songs
                                .map((song, i) => `${i === 0 ? '**Playing:**' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
                                .slice(0, 11)
                                .join('\n'));
                            return interaction.reply({ embeds: [embed] });
                        case "shuffle":
                            await queue.shuffle(voiceChannel);
                            embed.setColor("Green").setDescription("🔀 | Shuffle: Enabled");
                            return interaction.reply({ embeds: [embed] });
                        case "autoplay":
                            await queue.toggleAutoplay(voiceChannel);
                            embed.setColor("Green").setDescription("🔃 | Autoplay: Enabled");
                            return interaction.reply({ embeds: [embed] });
                        case "loopsong":
                            await queue.setRepeatMode(voiceChannel, 1);
                            embed.setColor("Green").setDescription("🔄 | Repeat: Enabled | Type: Song");
                            return interaction.reply({ embeds: [embed] });
                        case "loopqueue":
                            await queue.setRepeatMode(voiceChannel, 2);
                            embed.setColor("Green").setDescription("🔄 | Repeat: Enabled | Type: Queue");
                            return interaction.reply({ embeds: [embed] });
                        case "shuffle":
                            await queue.shuffle(voiceChannel);
                            embed.setColor("Green").setDescription("🔀 | Shuffle: Enabled");
                            return interaction.reply({ embeds: [embed] });
                    }
            }

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("⛔ | Something went wrong.");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}