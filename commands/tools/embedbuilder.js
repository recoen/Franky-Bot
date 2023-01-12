const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedbuilder')
        .setDescription('creates an embed for you to fully customize')
        .addChannelOption(
            option => option
                .setName('channel')
                .setDescription('where do you want to put the embed')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .addStringOption(
            option => option
                .setName('color')
                .setDescription('color of the embed')
                .addChoices(
                    { name: 'Aqua', value: 'Aqua' },
                    { name: 'Blue', value: 'Blue' },
                    { name: 'Blurple', value: 'Blurple' },
                    { name: 'DarkButNotBlack', value: 'DarkButNotBlack' },
                    { name: 'Default', value: 'Default' },
                    { name: 'Fuchsia', value: 'Fuchsia' },
                    { name: 'Gold', value: 'Gold' },
                    { name: 'Green', value: 'Green' },
                    { name: 'Grey', value: 'Grey' },
                    { name: 'Greyply', value: 'Greyply' },
                    { name: 'LightGrey', value: 'LightGrey' },
                    { name: 'LuminousVividPink', value: 'LuminousVividPink' },
                    { name: 'Navy', value: 'Navy' },
                    { name: 'NotQuiteBlack', value: 'NotQuiteBlack' },
                    { name: 'Orange', value: 'Orange' },
                    { name: 'Purple', value: 'Purple' },
                    { name: 'Random', value: 'Random' },
                    { name: 'Red', value: 'Red' },
                    { name: 'White', value: 'White' },
                    { name: 'Yellow', value: 'Yellow' },
                )
        )
        .addStringOption(
            option => option
                .setName('title')
                .setDescription('title of the embed')
                .setMaxLength(256)
        )
        .addStringOption(
            option => option
                .setName('title-url')
                .setDescription('URL of the title (make sure u put a hyperlink in)')
        )
        .addStringOption(
            option => option
                .setName('author')
                .setDescription('author of the embed')
                .setMaxLength(256)
        )
        .addStringOption(
            option => option
                .setName('description')
                .setDescription('description of the embed')
                .setMaxLength(4096)
        ),
        /*
        .addAttachmentOption(
            option => option
                .setName('thumbnail')
                .setDescription('thumbnail of the embed (left side image)')
        )
        
        .addAttachmentOption(
            option => option
                .setName('image')
                .setDescription('image of the embed (bottom side image)')
        ),
        */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const color = interaction.options.getString('color');
        const title = interaction.options.getString('title');
        const title_url = interaction.options.getString('title-url');
        const author = interaction.options.getString('author');
        const description = interaction.options.getString('description')
        //const thumbnail = interaction.options.getAttachment('thumbnail');
        //const image = interaction.options.getAttachment('image');

        const embed = new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${author}`.replace('null', ' ')})
        .setTitle(title)
        .setURL(title_url)
        .setDescription(description)
        //.setThumbnail(thumbnail.url)
        //.setImage(image.url)
        .setFooter({ text: `${interaction.user.tag} sent this embed`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: false })}`})
        .setTimestamp()

        channel.send({ embeds: [embed]})
        await interaction.reply({ content: `Embed has been sent to <#${channel.id}>`, ephemeral: true})
    }
}