const { Message } = require('discord.js')
const economyschema = require('../schema/economySchema')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const { guild, author } = message
        if (!guild || author.bot) return
        economyschema.findOne({ User: author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                economyschema.create({
                    User: author.id,
                    Money: 100
                })
            }
        })

        const give = Math.floor(Math.random() * 9) + 1
        const s = Math.floor(Math.random() * 100) + 1
        const sgive = Math.floor(Math.random() * 1000) + 100
        const data = await economyschema.findOne({ User: author.id })
        if (!data) return

        // if(s > 98) {
        //     message.reply(`well done, while talking, you found $${sgive}`)
        //     data.Money += sgive
        //     await data.save()
        // }
        if (data.Money + give) {
            data.Money += give
            await data.save()
        } else {
            data.Money = + give
            data.save()
        }
    }
}