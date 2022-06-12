
module.exports = {
    name: 'hello',
    description: 'Say hello to the bot',
    disabled: false,
    admin_only: false,
    e4_group_only: false,
    execute(ctx) {
        ctx.reply('Hello (☞ﾟヮﾟ)☞')

        console.log(ctx)
    }
}