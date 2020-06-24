const webpackConfig = require('./WebpackConfigModel')
const jsonConfig = require('./JSONConfigFile')
const packageJSON = require('./PackageJSON')

module.exports = {
  webpack: webpackConfig,
  jsonConfig,
  packageJSON
}
