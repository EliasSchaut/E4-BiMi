
module.exports = {
    name: 'admin_only',
    check(ctx) {
        return ctx.config.admin_ids.includes(ctx.update.message.from.id + "")
    },
    fail(ctx) {
        return ctx.reply("You are not an admin")
    }
}