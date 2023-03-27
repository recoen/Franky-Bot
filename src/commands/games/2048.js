const { SlashCommandBuilder } = require("discord.js");
const { TwoZeroFourEight } = require('discord-gamecord')
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

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
          const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
          const cmd = await commandListSchema.findOne({ User: interaction.user.id })
          const ggive = 1
  
          if (cmd.twofour + ggive) {
              cmd.twofour += ggive
              await cmd.save()
          } else {
              cmd.twofour = + ggive
              cmd.save()
          }
  
          if (cdata.TotalCmd + ggive) {
              cdata.TotalCmd += ggive
              await cdata.save()
          } else {
              cdata.TotalCmd = + ggive
              cdata.save()
          }
    }
}