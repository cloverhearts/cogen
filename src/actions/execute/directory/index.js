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
    writeFile: async (dirPath, filename, context, option = { encoding : 'utf8' }) => {
        return fs.writeFileSync(`${dirPath}/${filename}`, context, option)
    },
    readFile: async (dirPath, filename) => {
        return fs.readFileSync(`${dirPath}/${filename}`, { encoding : 'utf8' })
    },
    removeFile: async (dirPath, filename) => {
        return fs.unlinkSync(`${dirPath}/${filename}`)
    },
    existsFile: async (dirPath, filename) => {
        return fs.existsSync(`${dirPath}/${filename}`)
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