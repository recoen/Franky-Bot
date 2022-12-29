const { Interaction, EmbedBuilder } = require("discord.js");
const ms = require('ms-prettify').default

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return

        const t = client.timeouts.get(`${interaction.user.id}_${command.data.name}`) || 0;
        const timeout_embed = new EmbedBuilder()
        .setDescription(`you have to wait ${ms(t - Date.now(), { till: 'second' })} before you can use </${interaction.commandName}:${interaction.commandId}> again`)
        if (Date.now() - t < 0) return interaction.reply({ embeds: [timeout_embed] })
        client.timeouts.set(`${interaction.user.id}_${command.data.name}`, Date.now() + (command.timeout || 0))

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
};