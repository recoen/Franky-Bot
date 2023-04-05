const { SlashCommandBuilder } = require("discord.js");
const { RockPaperScissors } = require('discord-gamecord')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('play a game of rock paper scissors')
    .addUserOption(
      option => option
        .setName('target')
        .setDescription('play with someone')
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
      const Game = new RockPaperScissors({
        message: interaction,
        opponent: interaction.options.getUser('target'),
        embed: {
          title: 'Rock Paper Scissors',
          color: '#5865F2',
          description: 'Press a button below to make a choice.'
        },
        buttons: {
          rock: 'Rock',
          paper: 'Paper',
          scissors: 'Scissors'
        },
        emojis: {
          rock: '🌑',
          paper: '📰',
          scissors: '✂️'
        },
        mentionUser: true,
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        pickMessage: 'You choose {emoji}.',
        winMessage: '**{player}** won the Game! Congratulations!',
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

    if (cmd.rps + ggive) {
      cmd.rps += ggive
      await cmd.save()
    } else {
      cmd.rps = + ggive
      cmd.save()
    }
  }
}