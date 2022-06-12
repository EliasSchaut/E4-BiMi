const { Telegraf } = require('telegraf')
const fs = require('fs')
const config = require('../config/config.json')

const bot = new Telegraf(config.bot_token)

function load_commands() {
    const command_names = fs.readdirSync("./src/commands")
    bot.commands = {}
    for (const command_name of command_names) {
        const command = require(`./commands/${command_name}`)
        if (command.disabled) continue
        bot.commands[command.name] = command
    }
}

function load_mods() {
    const mod_names = fs.readdirSync("./src/mods")
    bot.mods = {}
    for (const mod_name of mod_names) {
        const mod = require(`./mods/${mod_name}`)
        bot.mods[mod.name] = mod
    }
}

function link_mods() {
    for (const command_name of Object.keys(bot.commands)) {
        const gen = function* (ctx) {
            for (const mod_name of Object.keys(bot.mods)) {
                if (bot.commands[command_name].hasOwnProperty(mod_name)
                    && bot.commands[command_name][mod_name] === true) {
                    const mod = bot.mods[mod_name]
                    yield (ctx) => {
                        if (mod.check(ctx)) return this.next().value
                        else return mod.fail(ctx)
                    }
                }
            }

            yield bot.commands[command_name].execute(ctx)
        }

        const next_func = function (ctx) {
            const g = gen(ctx)
            return g.next().value
        }

        bot.command(command_name, next_func)
    }
}

function init() {
    load_commands()
    load_mods()
    link_mods()
    bot.context.config = config
    bot.launch()

    console.log("Bot started")
}

init()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))