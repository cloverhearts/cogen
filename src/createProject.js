const directoryControl = require('./actions/execute/directory')
const { OS_LOCALE, LOCALE } = require('./actions/utils/locale')

const Prompts = require('prompts')
const chalk = require('chalk')
const ora = require('ora')
const got = require('got')
const extract = require('extract-zip')

const abstractCommand = (commander, cogen) => {
    return {
        projectName: cogen.projectName,
        projectPath: cogen.projectPath,
        usingTemplate: !!commander.template
    }
}

function printTemplateProfile (template) {
    console.log(chalk.greenBright(template.name))
}

exports.ASK_COMMON_CREATE_PROJECT = async (commander, cogen) => {
    const createProjectCommand = abstractCommand(commander, cogen)
    if (createProjectCommand.usingTemplate) {
        ASK_TEMPLATE_CREATE_PROJECT(createProjectCommand, cogen)
    }
}

const ASK_TEMPLATE_CREATE_PROJECT = async (createProjectCommand, cogen) => {
    const projectName = createProjectCommand.projectName
    const projectPath = createProjectCommand.projectPath
    const templates = await cogen.store.templates.read().get('templates').value()
    const question = {
        type: 'select',
        name: 'value',
        message: LOCALE('program.command.new.option.template.select_question'),
        choices: templates.map(template => {
            return {
                title: template.name,
                description: template.description[OS_LOCALE()],
                value: template.name,
                disabled: !!template.disabled
            }
        }),
        initial: 0
      }
    const selected = await Prompts(question)

    const selectedTemplate = templates.find(template => template.name === selected.value)
    
    if (!selectedTemplate) {
        console.error(chalk.redBright(LOCALE('error.common.cannot_found_template')))
        return
    }

    if (await directoryControl.existsDir(projectPath)) {
        console.error(chalk.redBright(LOCALE('error.common.directory_exists')))
        return
    }

    printTemplateProfile(selectedTemplate)

    directoryControl.mkdir(projectPath)
    console.log(selectedTemplate)

    try {
        const tempZipFileName = '_cogen_template.zip'
        const response = await got(selectedTemplate['file-url'], { responseType: 'buffer', resolveBodyOnly: true})
        await directoryControl.writeFile(projectPath, tempZipFileName, response ,{})
        await extract(`${tempZipFileName}/${tempZipFileName}`, { dir: tempZipFileName})
    } catch (error) {
        console.error(chalk.redBright(LOCALE('error.common.unknown')))
        console.error(error)
    }
    
}

exports.ASK_TEMPLATE_CREATE_PROJECT = ASK_TEMPLATE_CREATE_PROJECT