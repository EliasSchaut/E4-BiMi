
module.exports = {
    name: 'meal',
    description: 'Create a floor meal to automatically calculate the depts of the floor',
    disabled: false,
    admin_only: true,
    e4_group_only: false,
    execute(ctx) {
        console.log(ctx.stage)
    }
}
