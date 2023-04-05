const { SlashCommandBuilder } = require("discord.js");
const { Hangman } = require("discord-gamecord");
const commandListSchema = require('../../Schema/commandListSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hangman")
        .setDescription("play a game of hangman"),
        category: 'Games',
    async execute(interaction) {
        const Game = new Hangman({
            message: interaction,
            embed: {
                title: "Hangman",
                color: "#5865F2",
            },
            hangman: { hat: "🎩", head: "😟", shirt: "👕", pants: "🩳", boots: "👞👞" },
            timeoutTime: 60000,
            theme: "all", //find the where the words r stored and make a new line and just start put all words in that new array
            winMessage: "You won! The word was **{word}**.",
            loseMessage: "You lost! The word was **{word}**.",
            playerOnlyMessage: "Only {player} can use these buttons.",
        });

        Game.startGame();
        Game.on("gameOver", (result) => {
            return;
        });
        
        const cmd = await commandListSchema.findOne({ User: interaction.user.id })
        const ggive = 1

        if (cmd.hangman + ggive) {
            cmd.hangman += ggive
            await cmd.save()
        } else {
            cmd.hangman = + ggive
            cmd.save()
        }
    },
};
