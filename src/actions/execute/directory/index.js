const fs = require('fs')
const mkdirp = require('mkdirp')

module.exports = {
    mkdir: async (dirPath) =>{
        return mkdirp.sync(dirPath)
    },
    rmdir: async (dirPath) => {
        return fs.rmdirSync(dirPath, { recursive: true })
    },
    existsDir: async (dirPath) => {
        return fs.existsSync(dirPath)
    },
    cd: (dirPath) => {
        return new Promise((resolve, reject) => {
            try {
                process.chdir(dirPath)
                resolve({})
            } catch (error) {
                reject({ error })
            }
        })
    },
    pwd: () => {
        return process.cwd()
    }
}