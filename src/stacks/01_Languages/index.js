const Prompts = require('prompts')
const { getSteps, runStepsToArray } = require('../utils')

module.exports = async (selected, cogen, command) => {
  const stepFunctions = await getSteps(__dirname)
  const choices = await runStepsToArray(stepFunctions, selected, cogen, command)

  const language = await Prompts({
    type: 'select',
    name: 'value',
    message: cogen.actions.utils.locale.LOCALE('stacks.steps.languages.question'),
    choices: choices,
    initial: 0
  })

  return {
    ...selected,
    language,
  }
}