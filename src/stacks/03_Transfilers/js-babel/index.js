module.exports = async (selected, cogen) => {
  const description = {
    en: 'Babel is a Popular JavaScript compiler (https://babeljs.io/)',
    ko: '바벨은 인기있는 Javascript 컴파일러입니다 (https://babeljs.io/)'
  }[cogen.actions.utils.locale.OS_LOCALE()]

  const allowLanguages = ['javascript']
  const allowPlatforms = ['webpack_library']

  if (
    !allowLanguages.includes(selected.language.value.name) || 
    !allowPlatforms.includes(selected.platforms.value.name)) {
    return null
  }

  return {
    title: 'Support ES6 with Babel',
    description: description,
    value: { name: 'js_babel', runner: async (meta, cogen) => {
      const config = meta._output
      config._packageJSON.set('devDependencies.@babel/core', '^7.10.3')
      config._packageJSON.set('devDependencies.@babel/plugin-transform-modules-umd', '^7.10.1')
      config._packageJSON.set('devDependencies.@babel/preset-env', '^7.10.3')
      config._packageJSON.set('devDependencies.@babel/register', '^7.10.3')
      config._packageJSON.set('devDependencies.babel-loader', '^8.1.0')

      config._packageJSON.set('scripts.build', 'npm-run-all clean build:*')
      config._packageJSON.set('scripts.build:module', 'webpack --config webpack.config.js')

        // make webpack prod config
      if (!config._files['.babelrc']) {
        const jsonConfig = cogen.actions.execute.config.jsonConfig
        config._files['.babelrc'] = new jsonConfig({ "presets": [], "plugins": [] })
      }

      const babelrc = config._files['.babelrc'].toValue()

      !babelrc.presets ? babelrc.presets = [] : null
      !babelrc.plugins ? babelrc.plugins = [] : null

      
      babelrc.presets = Array.from(new Set([...babelrc.presets, '@babel/preset-env']))
      babelrc.plugins = Array.from(new Set([...babelrc.plugins, '@babel/plugin-transform-modules-umd']))
    }}
  }
}
