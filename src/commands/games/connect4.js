const { SlashCommandBuilder } = require('discord.js');
const { Connect4 } = require('discord-gamecord')
const commandListSchema = require('../../Schema/commandListSchema')

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
    const target = interaction.options.getUser('target')
    if (interaction.user.id == target.id) {
      interaction.reply({ content: 'you cant play by yourself', ephemeral: true })
    } else if (!interaction.user.bot) {
      interaction.reply({ content: 'you cant play with bots', ephemeral: true })
    } else {
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

    const cmd = await commandListSchema.findOne({ User: interaction.user.id })
    const ggive = 1

    if (cmd.connectfour + ggive) {
      cmd.connectfour += ggive
      await cmd.save()
    } else {
      cmd.connectfour = + ggive
      cmd.save()
    }
  }
}