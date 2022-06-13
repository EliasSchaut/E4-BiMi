const { Telegraf } = require('telegraf')
const fs = require('fs')
const config = require('../config/config.json')

const bot = new Telegraf(config.bot_token)
bot.context.config = config

// -----------------------------------------------------------------------------
// Load Functions
// -----------------------------------------------------------------------------
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

// super hacky way to link mods to commands
function link_mods() {
    // helper function to link a mod to a command
    const sfn = (ctx, ...fns) => {
        const next = (ctx) => {
            const fn = fns.shift()
            if (fn) return fn(ctx, next)
            else return ctx
        }
        return next(ctx)
    }

    const mod_fn = (ctx, mod, next) => {
        if (mod.check(ctx)) return next(ctx)
        else return mod.fail(ctx)
    }
    // -----------------

    for (const command_name of Object.keys(bot.commands)) {
        const cmd_mods = []
        for (const mod_name of Object.keys(bot.mods)) {
            if (bot.commands[command_name].hasOwnProperty(mod_name)
                && bot.commands[command_name][mod_name] === true) {
                const mod = bot.mods[mod_name]
                cmd_mods.push((ctx, next) => mod_fn(ctx, mod, next))
            }
        }

        cmd_mods.push(bot.commands[command_name].execute)
        bot.command(command_name, (ctx) => { sfn(ctx, ...cmd_mods) })
    }
}
// -----------------------------------------------------------------------------

function init() {
    load_commands()
    load_mods()
    link_mods()
    bot.launch()

    console.log("Bot started")
}

// init()
init()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))