const path = require('path')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

async function metaDataSetup() {
  const META_DATA = await require('../meta/runner.json')
  return META_DATA
}

async function databaseSetup(jsonFilePath) {
  const adapter = new FileSync(jsonFilePath)
  const packageDatabase = lowdb(adapter)
  return packageDatabase
}

export default async (_config) => {
  const _cogen = {}
  const config = _config || {}
  const templatesDatabasePath = config.packageDatabase || path.join(__dirname, '../meta/templates.json')
  const actionsDatabasePath = config.packageDatabase || path.join(__dirname, '../meta/actions.json')
  const store = {}
  store.meta = await metaDataSetup()
  store.templates = await databaseSetup(templatesDatabasePath)
  store.actions = await databaseSetup(actionsDatabasePath)
  _cogen.store = store
  global._cogen = _cogen
  return _cogen
}
