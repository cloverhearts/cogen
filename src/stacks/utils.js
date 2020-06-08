const fs = require('fs')
const path = require('path')

exports.getSteps = async (directoryPath) => {
  return fs.readdirSync(directoryPath, { withFileTypes: true })
  .filter( dirent => dirent.isDirectory() ? dirent : null)
  .map(dirent => dirent.name)
  .map(name => {
    return require(path.join(directoryPath, name, 'index.js'))
  })
  .filter(f => f)
}

exports.runSteps = async (steps, _selected, cogen, command) => {
  let selectedEnvironment = _selected
  for (let step of steps) {
    if (!step) { continue }
    selectedEnvironment = await step(selectedEnvironment, cogen, command)
  }
  return selectedEnvironment
}

exports.runStepsToArray = async (steps, _selected, cogen, command) => {
  let selectedEnvironment = []
  for (let step of steps) {
    if (!step) { continue }
    selectedEnvironment.push(await step(_selected, cogen, command))
  }
  return selectedEnvironment.filter(e => e)
}
