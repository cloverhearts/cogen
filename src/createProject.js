const abstractCommand = (commander, cogen) => {
    return {
        usingTemplate: !!commander.template
    }
}

exports.ASK_COMMON_CREATE_PROJECT = async (commander, cogen) => {
    const createProjectCommand = abstractCommand(commander, cogen)
    console.log(createProjectCommand.usingTemplate)
}