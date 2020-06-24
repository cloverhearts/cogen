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
      const WebpackConfig = cogen.actions.execute.config.webpack
      config._packageJSON.set('devDependencies.webpack', '^4.43.0')
        // make webpack prod config
      if (!config._files['webpack.config.js']) {
        const webpackProdConfig = {...defaultWebpackConfig.WEBPACK_CONFIG, mode: 'production' }
        config._files['webpack.config.js'] = new WebpackConfig({ bundleName: cogen.projectName, config: webpackProdConfig })
      }

      // make webpack dev config
      if (!config._files['webpack.dev.config.js']) {
        const webpackDevConfig = {...defaultWebpackConfig.WEBPACK_DEV_CONFIG, mode: 'development' }
        config._files['webpack.dev.config.js'] = new WebpackConfig({ bundleName: cogen.projectName, config: webpackDevConfig })
      }
    }}
  }
}
