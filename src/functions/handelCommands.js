const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('../config.json')
require('colors')

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                console.log('[COMMANDS] '.grey + `${command.data.name}`.bold + ' was Loaded'.green)
                client.commandArray.push(command.data.toJSON());
            }
        }
        console.log(' ')
        const rest = new REST({
            version: '9'
        }).setToken(config.discord.token);

        (async () => {
            try {
                await rest.put(
                    Routes.applicationCommands(config.discord.clientId), {
                        body: client.commandArray
                    },
                );
            } catch (error) {
                console.error(error);
            }
        })();
    };
};