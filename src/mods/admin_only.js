
module.exports = {
    check(ctx) {
        return ctx.update.message.from.id === ctx.bot.config.admin_id
    }
}