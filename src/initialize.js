
import LOCALE from './libraries/utils/locale'
const path = require('path')
const packageInformation = require(path.join(__dirname, '../package.json'))
const commander = require('commander');

async function createOptions(program) {
  return program
    .version(packageInformation.version, '-v, --version', await LOCALE('program.options.version.description'))
    .command('new [project-name]', 'project 이름 ')
    .on('--help', () => {
      console.log('');
      console.log('Example call:');
      console.log('  $ custom-help --help');
    })
    .helpOption('-h, --help', '')
    .option('-f, --force', '')
    .option('-d, --debug', '')
}

export default async () => {
  const program = await createOptions(commander.program)
  return { program }
}
