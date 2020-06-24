class JSONConfigFile {
  constructor(config) {
    this._config = {...config} || {}
  }

  toValue() {
    return this._config
  }

  toString() {
    return JSON.stringify(this.toValue())
  }
}

module.exports = JSONConfigFile