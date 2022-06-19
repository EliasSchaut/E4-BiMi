const { Scenes } = require('telegraf');

module.exports = {
    id: 'MEAL',
    enter() {
        return new Scenes.WizardScene(
            this.id,
            (ctx) => {
                ctx.reply('Enter the full cost of the floor meal! (e.g. "23.5")')
                ctx.wizard.state.meal_data = {}
                return ctx.wizard.next()
            },
            (ctx) => {
                if (!ctx.message.text.match(/^\d+\.\d+$/)) {
                    ctx.reply('Invalid cost! Please enter a valid cost! (e.g. "23.5")')
                    return ctx.wizard.back()
                }

                ctx.wizard.state.meal_data.cost = ctx.message.text
                ctx.reply('Enter all room numbers of all participants the following: e4XX,e4XX,...,e4XX!\n' +
                    '(e.g. "e401,e406,e410")')
                return ctx.wizard.next()
            },
            (ctx) => {
                if (!ctx.message.text.match(/^e4\d{2}(,e4\d{2})*$/)) {
                    ctx.reply('Invalid room numbers! Please enter valid room numbers! (e.g. "e401,e406,e410")')
                    return ctx.wizard.back()
                }

                ctx.wizard.state.meal_data.rooms = ctx.message.text.split(',')
                ctx.reply('Enter all names of all buyers the following: e4XX,e4XX,...,e4XX!\n(e.g. "e406")')
                return ctx.wizard.next()
            },
            async (ctx) => {
                if (!ctx.message.text.match(/^e4\d{2}(,e4\d{2})*$/)) {
                    ctx.reply('Invalid room numbers! Please enter valid room numbers! (e.g. "e406")')
                    return ctx.wizard.back()
                }
                ctx.wizard.state.meal_data.buyers = ctx.message.text.split(',')
                await ctx.reply('Calculating...')
                await ctx.reply('Done!')
                console.log(ctx.wizard.state.meal_data)
                return ctx.scene.leave()
            }
        )
    }
}

