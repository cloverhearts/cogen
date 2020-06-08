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
    value: { name: 'webpack_library', runner: async (config, cogen) => {
      config._packageJSON.set('devDependencies.webpack', '^4.43.0')

        // make webpack prod config
      if (config._configFile.get('webpack.config.js')) {
        const webpackProdConfig = {...defaultWebpackConfig }
        config._configFile.set('webpack.config.js',
          {
            value: webpackProdConfig,
            toValue: () => {
              return `
const path = require("path");
module.exports = ${JSON.stringify(webpackProdConfig)}
              `
            }
          }
        )
      }

        // make webpack dev config
        if (config._configFile.get('webpack.config.dev.js')) {
          const webpackDevConfig = {...defaultWebpackConfig }
          webpackDevConfig.mode = 'development'
          config._configFile.set('webpack.config.dev.js',
            {
              value: webpackDevConfig,
              toValue: () => {
                return `
const path = require("path");
module.exports = ${JSON.stringify(webpackDevConfig)}
              `
              }
            }
          )
        }

    }}
  }
}
