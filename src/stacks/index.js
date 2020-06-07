const { getSteps, runSteps } = require('./utils')

module.exports = {
    runSteps: async (cogen, command) => {
      const defaultPackageJSON = cogen.actions.execute.npm.getDefaultPackageJSON()
      defaultPackageJSON.name(cogen.projectName)
      const initializeConfig = {
        _packageJSON: defaultPackageJSON,
        _configFile: cogen.actions.execute.npm.getConfigFile()
      }
      const stepFunctions = await getSteps(__dirname)
      const results = await runSteps(stepFunctions, initializeConfig, cogen, command)
      results.platforms.value.runner(results, cogen)
      return results
    }
}
