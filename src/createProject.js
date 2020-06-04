module.exports = async (commander, cogen) => {
    console.log('execute to new command ', !!commander.template, cogen)
    cogen.actions.execute.directory.mkdir(cogen.projectPath)
}