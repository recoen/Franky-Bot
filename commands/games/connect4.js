const { SlashCommandBuilder } = require('discord.js');
const { Connect4 } = require('discord-gamecord')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('connect4')
    .setDescription('play a game of connect4')
    .addUserOption(
        option => option
        .setName('target')
        .setDescription('person to play with')
        .setRequired(true)
    ),
    category: 'Games',
    async execute(interaction) {
        const Game = new Connect4({
            message: interaction,
            opponent: interaction.options.getUser('target'),
            embed: {
              title: 'Connect4 Game',
              statusTitle: 'Status',
              color: '#5865F2'
            },
            emojis: {
              board: '⚪',
              player1: '🔴',
              player2: '🟡'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            turnMessage: '{emoji} | Its turn of player **{player}**.',
            winMessage: '{emoji} | **{player}** won the Connect4 Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            return
          });
    }
}