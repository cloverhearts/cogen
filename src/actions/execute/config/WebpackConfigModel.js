const serialize = require('serialize-javascript')

class WebpackConfigModel {
  constructor({projectName}) {
    const _projectName = projectName.replace(/ /gi, '_')
    this._requires = {
      path: { name: 'path', alias: 'path' }
    }
    this._exports = {
      mode: "production",
      target: "node", // or web
      entry: {
        bundle: () => `path.resolve(__dirname, "${_projectName}.js")`
      },
    }
  }

  require(name, alias) {
    this._requires[name] = { name, alias: alias || name }
  }

  get exports() {
    return this._exports
  }

  toString() {
    const configRaw = this.exports
    configRaw.entry.bundle && typeof configRaw.entry.bundle === 'function' ? configRaw.entry.bundle = `remove%%${configRaw.entry.bundle()}%%remove` : null
    configRaw.output && typeof configRaw.output.path  === 'function' ? configRaw.output.path = `remove%%${configRaw.entry.bundle()}%%remove` : null

    const configTextRaw = serialize(configRaw, { space: 2 })
    return `
${Object.keys(this._requires).map(k => this._requires[k]).map(r => `const ${r.alias} = require('${r.name}')`).join('\n')}
module.exports = ${configTextRaw.replace(/("remove%%|%%remove")/g, '').replace(/\\"/g, '"')}
    `
  }
}

module.exports = WebpackConfigModel