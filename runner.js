

import LOCALE from './src/libraries/utils/locale'
import versionChecker from './src/libraries/fetch/meta-runner'
import INITIALIZE from './src/initialize'
import LOGO from './src/logo'
import UPDATE from './src/update'

export default async (processArgv) => {
  // console.log('locale ', await LOCALE('command.new.description'))
  const [NODE_PATH, EXECUTE_PATH, ...COMMAND_ARG ] = processArgv
  await LOGO()
  const { program } = await INITIALIZE()
  program.parse(processArgv)

  console.log(program)
}
