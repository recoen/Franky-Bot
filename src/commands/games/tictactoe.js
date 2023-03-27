const { SlashCommandBuilder } = require("discord.js");
const { TicTacToe } = require('discord-gamecord');
const userinfoSchema = require('../../Schema/userinfoSchema')
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tictactoe')
    .setDescription('play a game of tictactoe')
    .addUserOption(
      option => option
        .setName('target')
        .setDescription('play with someone')
        .setRequired(true)
    ),
  category: 'Games',
  async execute(interaction, client) {
    const target = interaction.options.getUser('target')
    if (interaction.user.id == target.id) {
      interaction.reply({ content: 'you cant play by yourself', ephemeral: true })
    } else if (!interaction.user.bot) {
      interaction.reply({ content: 'you cant play with bots', ephemeral: true })
    } else {
      const Game = new TicTacToe({
        message: interaction,
        opponent: interaction.options.getUser('target'),
        embed: {
          title: "Tic Tac Toe",
          color: "#5865F2",
          statusTitle: "Status",
          overTitle: "Game Over",
        },
        emojis: {
          xButton: "❌",
          oButton: "🔵",
          blankButton: "➖",
        },
        mentionUser: true,
        timeoutTime: 60000,
        xButtonStyle: "DANGER",
        oButtonStyle: "PRIMARY",
        turnMessage: "{emoji} | Its turn of player **{player}**.",
        winMessage: "{emoji} | **{player}** won the TicTacToe Game.",
        tieMessage: "The Game tied! No one won the Game!",
        timeoutMessage: "The Game went unfinished! No one won the Game!",
        playerOnlyMessage: "Only {player} and {opponent} can use these buttons.",
      });

      Game.startGame();
      Game.on("gameOver", (result) => {
        return
      });
    }
    const cdata = await userinfoSchema.findOne({ User: interaction.user.id })
    const cmd = await commandListSchema.findOne({ User: interaction.user.id })
    const ggive = 1

    if (cmd.ttt + ggive) {
      cmd.ttt += ggive
      await cmd.save()
    } else {
      cmd.ttt = + ggive
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