const createProjectStacks = require('./stacks')
const directoryControl = require('./actions/execute/directory')
const { OS_LOCALE, LOCALE } = require('./actions/utils/locale')

const fs = require('fs')
const path = require('path')
const Prompts = require('prompts')
const chalk = require('chalk')
const ora = require('ora')
const got = require('got')
const decompress = require('decompress');


const abstractCommand = (commander, cogen) => {
    return {
        projectName: cogen.projectName,
        projectPath: cogen.projectPath,
        usingTemplate: !!commander.template
    }
}

function printTemplateProfile (template) {
    console.log('\r')
    console.log(chalk.yellowBright(`<< ${template.name} >>`))
    console.log(chalk.whiteBright (`- ${template.language.join(', ')}`))
    console.log('\r\r')
    console.log(chalk.whiteBright (`${template.description[OS_LOCALE()]}`))
    console.log('\r\r')
    console.log(chalk.blackBright (`Home: ${template.homepage}`))
    console.log(chalk.blackBright  (`Repo: ${template.repository}`))
    console.log(chalk.gray('----------------------------'))
    console.log(chalk.cyan (`${template.authors.map(author => {
        return `${author.name} <${author.email}>\n- Repo: ${author['profile-url']}\n- Home: ${author['homepage-url']}`
    })}`))
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

    const spinner = ora(LOCALE('program.command.new.status.download_template')).start();

    directoryControl.mkdir(projectPath)

    try {
        const tempZipFileName = '_cogen_template.zip'
        const response = await got(selectedTemplate['file-url'], { responseType: 'buffer', resolveBodyOnly: true})        
        await directoryControl.writeFile(projectPath, tempZipFileName, response ,{})
        await decompress(path.join(projectPath, tempZipFileName), projectPath, { strip: 1 })
        const packageJSONRaw = await fs.readFileSync(path.join(projectPath, 'package.json'))
        const packageJSON = JSON.parse(packageJSONRaw)
        packageJSON.name = projectName
        fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJSON, null, 2), 'utf-8')
        fs.unlinkSync(path.join(projectPath, tempZipFileName))
        console.log('\n')
        spinner.text = 'Done'
        spinner.stop()
        console.log('\n')
        console.log(chalk.greenBright(LOCALE('program.command.new.status.create_done')))
        console.log(chalk.greenBright(LOCALE('program.common.enjoy')))
    } catch (error) {
        console.error(chalk.redBright(LOCALE('error.common.unknown')))
        console.error(error)
    }
}

exports.ASK_TEMPLATE_CREATE_PROJECT = ASK_TEMPLATE_CREATE_PROJECT

const ASK_NEW_CREATE_PROJECT = async (createProjectCommand, cogen) => {
    const projectPath = createProjectCommand.projectPath
    const result = await createProjectStacks.runSteps(cogen, createProjectCommand)
    directoryControl.mkdir(projectPath)
    directoryControl.mkdir(path.join(projectPath, 'tests'))
    directoryControl.mkdir(path.join(projectPath, 'src'))
    Object.keys(result._output._files).map(filepath => {
        const config = result._output._files[filepath].toString()
        fs.writeFileSync(path.join(projectPath, filepath), config, { encoding: 'utf8' })
    })
    fs.writeFileSync(path.join(projectPath, 'package.json'), result._output._packageJSON.toString(), { encoding: 'utf8'})
    console.log('\n')
    console.log(chalk.greenBright(LOCALE('program.command.new.status.create_done')))
    console.log(chalk.greenBright(LOCALE('program.common.enjoy')))
}

exports.ASK_NEW_CREATE_PROJECT = ASK_NEW_CREATE_PROJECT

exports.ASK_COMMON_CREATE_PROJECT = async (commander, cogen) => {
    const createProjectCommand = abstractCommand(commander, cogen)

    const usingTemplate = await Prompts({
        type: 'select',
        name: 'value',
        message: 'Cogen create project',
        choices: [
          { title: 'Template', description: 'Make a new project from exists template', value: true },
          { title: 'Your self', description: 'Make a new project with Build configuration', value: false }
        ],
        initial: 0
      })
    
    if (usingTemplate.value) {
        await ASK_TEMPLATE_CREATE_PROJECT(createProjectCommand, cogen)
    } else {
        await ASK_NEW_CREATE_PROJECT(createProjectCommand, cogen)
    }
}
