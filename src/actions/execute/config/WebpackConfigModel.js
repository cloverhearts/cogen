const serialize = require('serialize-javascript')

class WebpackConfigModel {
  constructor(_option = {}) {
    const _bundleName = _option.bundleName || 'bundle'
    const bundleName = _bundleName.replace(/ /gi, '_')
    const config = _option.config || {
      mode: "production",
      target: "node", // or web
      entry: {
        bundle: () => `path.resolve(__dirname, "${bundleName}.js")`
      },
    }
    this._requires = {
      path: { name: 'path', alias: 'path' }
    }
    this._exports = config
  }

  require(alias, packageName) {
    this._requires[alias] = { name: packageName, alias: alias || packageName }
  }

  get exports() {
    return this._exports
  }

  toString() {
    const configRaw = this.exports
    Object.keys(configRaw.entry).map(bundleKey => {
      configRaw.entry[bundleKey] && typeof configRaw.entry[bundleKey] === 'function' ? configRaw.entry[bundleKey] = `remove%%${configRaw.entry[bundleKey]()}%%remove` : null
    })

    configRaw.output && typeof configRaw.output.path  === 'function' ? configRaw.output.path = `remove%%${configRaw.output.path()}%%remove` : null

    const configTextRaw = serialize(configRaw, { space: 2 })
    return `
${Object.keys(this._requires).map(k => this._requires[k]).map(r => `const ${r.alias} = require('${r.name}')`).join('\n')}
module.exports = ${configTextRaw.replace(/("remove%%|%%remove")/g, '').replace(/\\"/g, '"')}
    `
  }
}

module.exports = WebpackConfigModel