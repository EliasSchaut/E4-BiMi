const { Telegraf } = require('telegraf')
const fs = require('fs')
const config = require('../config/config.json')
const {admin_only} = require("./commands/hello");

const bot = new Telegraf(config.bot_token)

function load_commands() {
    const command_names = fs.readdirSync("./src/commands")
    for (const command_name of command_names) {
        const command = require(`./commands/${command_name}`)
        if (command.disabled) continue
        //bot.commands[command.name] = command

        bot.command(command.name, command.execute)
    }
}

function load_mods() {
    const mod_names = fs.readdirSync("./src/mods")
    for (const mod_name of mod_names) {
        bot.mods[mod_name] = require(`./mods/${mod_name}`)
    }
}

function link_mods() {
    for (const mod_name in bot.mods) {
        for (const command of bot.commands) {
            //const fn = function ()
        }
    }
}

function init() {
    load_commands()
    bot.context.config = config
    bot.launch()

    console.log("Bot started")
}

init()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))