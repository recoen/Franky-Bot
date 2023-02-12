const { SlashCommandBuilder } = require("discord.js");
const { TwoZeroFourEight } = require('discord-gamecord')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('2048')
    .setDescription('play a game of 2048'),
    category: 'Games',
    async execute(interaction) {
        const Game = new TwoZeroFourEight({
            message: interaction,
            embed: {
              title: '2048',
              color: '#5865F2'
            },
            emojis: {
              up: '⬆️',
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            return
          });
          
    }
}