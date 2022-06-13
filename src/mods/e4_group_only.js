
module.exports = {
    name: 'e4_group_only',
    check(ctx) {
        return ctx.config.e4_chat_id === ctx.update.message.chat.id + ""
    },
    fail(ctx) {
        return ctx.reply("This command works only in the E4 group")
    }
}