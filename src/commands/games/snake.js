const { SlashCommandBuilder } = require("discord.js");
const { Snake } = require('discord-gamecord')
const config = require('../../config.json')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('snake')
    .setDescription('play a game of snake'),
    category: 'Games',
    async execute(interaction) {
        const Game = new Snake({
            message: interaction,
            embed: {
              title: 'Snake Game',
              overTitle: 'Game Over',
              color: '#5865F2'
            },
            emojis: {
              board: config.emojis.black,
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            return
          });
          
          const cmd = await commandListSchema.findOne({ User: interaction.user.id })
          const ggive = 1
  
          if (cmd.snake + ggive) {
              cmd.snake += ggive
              await cmd.save()
          } else {
              cmd.snake = + ggive
              cmd.save()
          }
    }
}