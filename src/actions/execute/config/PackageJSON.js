class PackageJSON {
    constructor(config = {}) {
        const packageName = config.packageName || "my-new-package-with-cogen"
        this._model = { 
            "name": packageName,
            "version": "1.0.0", 
            "description": "",
            "main": "index.js",
            "scripts": {},
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {},
            "devDependencies": {}
          }
    }

    /**
     * allowed key type likes 'key.depth1.depth2'.
     * set value by key with package.json
     * @param {String} key
     * @param {Any} value
     */
    set(key, value) {
        if (!key) {
            return
        }
        const accessKeys = key.split('.')
        const lastIndexOfAccessKeys = accessKeys.length - 1
        return accessKeys.reduce((model, token, index) => {
            if (!model[token]) {
                model[token] = {}
            }

            if (index >= lastIndexOfAccessKeys) {
                model[token] = value
            }
            return model[token]
        }, this._model)
    }

    /**
     * allowed key type likes 'key.depth1.depth2'.
     * remove key with package.json
     * @param {String} key 
     */
    remove(key) {
        if (!key) {
            return
        }
        const accessKeys = key.split('.')
        const lastIndexOfAccessKeys = accessKeys.length - 1
        return accessKeys.reduce((model, token, index) => {
            if (!model[token]) {
                model[token] = {}
            }

            if (index >= lastIndexOfAccessKeys) {
                delete model[token]
            }
            return model[token]
        }, this._model)
    }

    name(_projectName) {
        this.set('name', _projectName)
        return this
    }

    version(_version) {
        this.set('version', _version)
        return this
    }

    description(_description) {
        this.set('description', _description)
        return this
    }

    main(_main) {
        this.set('main', _main)
        return this
    }

    scripts(_scripts) {
        this.set('scripts', _scripts)
        return this
    }

    keywords(_keywords) {
        this.set('keywords', _keywords)
        return this
    }

    author(_author) {
        this.set('author', _author)
        return this
    }

    dependencies(_dependencies) {
        this.set('dependencies', _dependencies)
        return this
    }

    devDependencies(_devDependencies) {
        this.set('devDependencies', _devDependencies)
        return this
    }

    toString() {
        return JSON.stringify(this._model)
    }
}

module.exports = PackageJSON