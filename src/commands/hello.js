
module.exports = {
    name: 'hello',
    description: 'Say hello to the bot',
    disabled: false,
    admin_only: false,
    e4_group_only: true,
    execute(ctx) {
        ctx.reply('Hello (☞ﾟヮﾟ)☞')
        console.log("Context Infos:\n", ctx.update, "\n")
    }
}