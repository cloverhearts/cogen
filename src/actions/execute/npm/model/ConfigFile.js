class ConfigFile {
  constructor() {
    this._config = {}
  }

  /**
   *
   * @param path
   * @param value { toValue() }
   */
  set(path, value) {
    if (value && value.toValue) {
      this._config[path] = value
    } else {
      this._config[path] = { value, toValue: () => { return JSON.stringify(value)} }
    }
  }

  get(path) {
    return this._config[path]
  }

  toValue() {
    return this._config
  }
}

module.exports = ConfigFile