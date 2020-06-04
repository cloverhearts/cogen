
const INITIALIZE = require('./src/initialize')
const LOCALE = require('./src/actions/utils/locale')
const LOGO = require('./src/logo')
const NEW_ACTION = require('./src/createProject')
const UPDATE = require('./src/update')

const commander = require('commander');
const path = require('path')
const PACKAGE_INFORMATION = require(path.join(__dirname, 'package.json'))

exports.NEW_COMMAND_ACTION = async (processArgv) => {
  const cogen = await INITIALIZE()
  const program = commander.program
  program
    .name(`${PACKAGE_INFORMATION.name} new`)
    .arguments('[project_name]')
    .option('-t, --template')
    .action((project_name, cmdObj) => {
      cogen.projectName = project_name
      cogen.projectPath = path.join(cogen.cwd, project_name)
      NEW_ACTION(cmdObj, cogen)
    })
  program.parseAsync(processArgv)
}

exports.GATE = async (processArgv) => {
  const [NODE_PATH, EXECUTE_PATH, ...COMMAND_ARG ] = processArgv
  await LOGO()
  const program = commander.program
  program
    .version(PACKAGE_INFORMATION.version, '-v, --version', await LOCALE('program.options.version.description'))
    .command('new <project_name>', await LOCALE('program.command.new.description'))
    .addHelpCommand(false)
    .helpOption('-h, --help', await LOCALE('program.options.help.description'))
    .on('--help', () => {
      console.log('');
      console.log('Example call2:');
      console.log('  $ custom-help --help');
    })
  await program.parseAsync(processArgv)
}
