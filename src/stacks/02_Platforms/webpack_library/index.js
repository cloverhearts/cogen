const defaultWebpackConfig = require('./assets/defaultConfig')

module.exports = async (selected, cogen) => {
  const description = {
    en: 'Make a library with webpack bundler',
    ko: '웹팩 번들러를 이용한 라이브러리 제작'
  }[cogen.actions.utils.locale.OS_LOCALE()]


  if (selected.language.value.name !== 'javascript') {
    return null
  }

  return {
    title: 'Javascript library with Webpack',
    description: description,
    value: { name: 'webpack_library', runner: async (meta, cogen) => {
      const config = meta._output
      const WebpackConfig = cogen.actions.execute.config.jsConfig
      config._packageJSON.set('devDependencies.webpack-cli', '^3.3.12')
      config._packageJSON.set('devDependencies.webpack', '^4.43.0')
      config._packageJSON.set('devDependencies.npm-run-all', '^4.1.5')
      config._packageJSON.set('devDependencies.rimraf', '^3.0.2')

      config._packageJSON.set('scripts.clean', 'rimraf ./dist')

        // make webpack prod config
      if (!config._files['webpack.config.js']) {
        const webpackProdConfig = {...defaultWebpackConfig.WEBPACK_CONFIG, mode: 'production' }
        config._files['webpack.config.js'] = new WebpackConfig({ ...webpackProdConfig })
      }

      // make webpack dev config
      if (!config._files['webpack.dev.config.js']) {
        const webpackDevConfig = {...defaultWebpackConfig.WEBPACK_DEV_CONFIG, mode: 'development' }
        config._files['webpack.dev.config.js'] = new WebpackConfig({ ...webpackDevConfig })
      }
    }}
  }
}
