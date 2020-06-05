const cogenActions = require('./actions')

const fs = require('fs')
const path = require('path')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


async function metaDataSetup() {
  const META_DATA_RAW = await fs.readFileSync(path.join(__dirname, '../meta/runner.json'))
  return JSON.parse(META_DATA_RAW)
}

async function databaseSetup(jsonFilePath) {
  const adapter = new FileSync(jsonFilePath)
  return lowdb(adapter)
}

module.exports = async (_config) => {
  const config = _config || {}
  const templatesDatabasePath = config.packageDatabase || path.join(__dirname, '../meta/templates.json')
  const actionsDatabasePath = config.packageDatabase || path.join(__dirname, '../meta/actions.json')
  const store = {
    meta: await metaDataSetup(),
    templates: await databaseSetup(templatesDatabasePath),
    actions: await databaseSetup(actionsDatabasePath)
  }

  const _cogen = {
    cwd: process.cwd(),
    projectName: config.projectName,
    projectPath: config.projectPath,
    store,
    actions: cogenActions
  }
  global._cogen = _cogen
  return _cogen
}
