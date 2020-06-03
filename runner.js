

import LOCALE from './src/libraries/utils/locale'
import versionChecker from './src/libraries/fetch/meta-runner'
import INITIALIZE from './src/initialize'
import LOGO from './src/logo'

import NEW_ACTION from './src/createProject'
import UPDATE from './src/update'

const commander = require('commander');
const path = require('path')
const PACKAGE_INFORMATION = require(path.join(__dirname, 'package.json'))

export const NEW_COMMAND_ACTION = async (processArgv) => {
  const program = commander.program
  program
    .name(`${PACKAGE_INFORMATION.name} new`)
    .arguments('[project_name]')
    .action((project_name, cmdObj) => {
      console.log('create project ' + project_name + ' debug is ', !!cmdObj.debug)
      NEW_ACTION(project_name)
    })
  program.parseAsync(processArgv)
}

export default async (processArgv) => {
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
