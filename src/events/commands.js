const { Interaction, EmbedBuilder } = require("discord.js");
const ms = require('ms-prettify').default
const config = require('../config.json');
const userinfoSchema = require("../Schema/userinfoSchema");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return

        const t = client.timeouts.get(`${interaction.user.id}_${command.data.name}`) || 0;
        if (Date.now() - t < 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`:warning: | You have to wait ${ms(t - Date.now(), { till: 'second' })} before you can use </${interaction.commandName}:${interaction.commandId}> again`)
                    .setColor(config.color.embed)
            ],
            ephemeral: true
        })
        client.timeouts.set(`${interaction.user.id}_${command.data.name}`, Date.now() + (command.cooldown || 0))

        if (command.ownerOnly && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(config.color.embed)
                        .setDescription(":warning: | This command is only available to the owner of the Discord server.")
                ],
                ephemeral: true
            });
        }

        if (command.devOnly && interaction.user.id !== config.discord.yourId) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(config.color.embed)
                        .setDescription(':warning: | This command is for Develepors only')
                ],
                ephemeral: true
            })
        }

        try {
            await command.execute(interaction, client);

            const cdata = await userinfoSchema.findOne({ User: interaction.user.id })

            if (cdata.TotalCmd + 1) {
                cdata.TotalCmd += 1
                await cdata.save()
            } else {
                cdata.TotalCmd =+ 1
                await cdata.save()
            }
        } catch (error) {
            console.log(error);
            const error_embed = new EmbedBuilder()
                .setDescription(`There was an error while executing this command!\n\`\`\`${error || 'Cant find anything wrong'}\`\`\``)
            await interaction.reply({
                embeds: [error_embed],
                ephemeral: true
            });
        }
    }
};