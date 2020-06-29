let cogen = null

beforeAll(async () => {
  console.log('initialize')
  const initialize = require('../../../src/initialize')
  cogen = await initialize()
})

test('test for create and remove directory', async () => {
  const JSConfigModel = cogen.actions.execute.config.jsConfig
  const config = new JSConfigModel({ projectName: 'My FirstWebpack' })
  console.log('cogen ', config)
  console.log(config.toString())
})
