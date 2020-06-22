let cogen = null

beforeAll(async () => {
  console.log('initialize')
  const initialize = require('../../../src/initialize')
  cogen = await initialize()
})

test('test for create and remove directory', async () => {
  const WebpackConfigModel = cogen.actions.execute.config.webpack
  const config = new WebpackConfigModel({ projectName: 'My FirstWebpack' })
  console.log('cogen ', config)
  console.log(config.toString())
})
