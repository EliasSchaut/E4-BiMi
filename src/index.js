const { Telegraf } = require('telegraf')
const fs = require('fs')
const config = require('../config/config.json')

const bot = new Telegraf(config.bot_token)

function load_commands() {
    const command_names = fs.readdirSync("./commands")
    for (const command_name of command_names) {
        const command = require(`./commands/${command_name}`)
        if (command.disabled) continue

        bot.command(command.name, command.execute)
    }
}

load_commands()
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))