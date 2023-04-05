const { SlashCommandBuilder } = require('discord.js')
const { Wordle } = require('discord-gamecord')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wordle')
    .setDescription('play a game of wordle'),
    async execute(interaction) {
        const Game = new Wordle({
            message: interaction,
            embed: {
              title: 'Wordle',
              color: '#5865F2',
            },
            customWord: null,
            timeoutTime: 60000,
            winMessage: 'You won! The word was **{word}**.',
            loseMessage: 'You lost! The word was **{word}**.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            return;
          });
          
          const cmd = await commandListSchema.findOne({ User: interaction.user.id })
          const ggive = 1
  
          if (cmd.wordle + ggive) {
              cmd.wordle += ggive
              await cmd.save()
          } else {
              cmd.wordle = + ggive
              cmd.save()
          }
    }
}