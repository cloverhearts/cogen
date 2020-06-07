class WebpackConfigModel {
  constructor(props) {
    this._requires = {}
    this._module = {}
    this._target = 'web'
  }

  setRequire(name, alias) {
    this._requires[name] = { name, alias: alias || name }
  }

  setTarget(target) {
    this._target = target
  }

}