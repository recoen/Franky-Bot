const { Message } = require('discord.js')
const UserSchema = require('../Schema/userinfoSchema')
const commandListSchema = require('../Schema/commandListSchema')
const serverSetupSchema = require('../Schema/serverSetupSchema')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const { guild, author } = message
        if (!guild || author.bot) return

        serverSetupSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if(err) throw err
            if(!data) {
                serverSetupSchema.create({
                    Guild: guild.id,
                    nsfwToggle: false,
                    frankyLogsEnabled: false
                })
            }
        })

        UserSchema.findOne({ User: author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                UserSchema.create({
                    User: author.id,
                    TotalMsg: 0,
                    TotalCmd: 0,
                })
            }
        })

        commandListSchema.findOne({ User: author.id }, async (err, data) => {
            if (err) throw err
            if (!data) {
                commandListSchema.create({
                    User: author.id,
                })
            }
        })
        
        const give = 1
        const data = await UserSchema.findOne({ User: author.id })
        if (!data) return

        if (data.TotalMsg + give) {
            data.TotalMsg += give
            await data.save()
        } else {
            data.TotalMsg = + give
            data.save()
        }
    }
}