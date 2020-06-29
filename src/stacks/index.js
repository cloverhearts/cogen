const { getSteps, runSteps } = require('./utils')

module.exports = {
    runSteps: async (cogen, command) => {
      const defaultPackageJSON = cogen.actions.execute.npm.getDefaultPackageJSON()
      defaultPackageJSON.name(cogen.projectName)
      const initializeConfig = {
        _output: {
          _packageJSON: defaultPackageJSON,
          _files: {}
        }
      }
      const stepFunctions = await getSteps(__dirname)
      const results = await runSteps(stepFunctions, initializeConfig, cogen, command)
      results.language.value.runner(results, cogen)
      results.platforms.value.runner(results, cogen)
      results.transfilers.value.runner(results, cogen)
      results.tests.value.runner(results, cogen)
      return results
    }
}
