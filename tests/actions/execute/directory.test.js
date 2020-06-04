const fs = require('fs')
const path = require('path')

let cogen = null

beforeAll(async () => {
    console.log('initialize')
    const initialize = require('../../../src/initialize')
    cogen = await initialize()
})

test('test for create and remove directory', async () => {
    expect(cogen.cwd).toBeTruthy()
    const PROJECT_NAME = 'CloverHeartsAndSUJINI'
    const FULL_PATH = path.join(`${cogen.cwd}`,`${PROJECT_NAME}`)

    if (fs.existsSync(FULL_PATH)) {
        console.error(`[${PROJECT_NAME}] Directory is exists, You need to remove it before test begin.`)
        expect()
    }

    // check for exists directory.
    expect(await cogen.actions.execute.directory.existsDir(FULL_PATH)).toBe(fs.existsSync(FULL_PATH))
    // make project directory.
    
    await cogen.actions.execute.directory.mkdir(FULL_PATH)

    expect(fs.existsSync(FULL_PATH)).toBeTruthy()
    // check for removed directory.
    expect(await cogen.actions.execute.directory.existsDir(FULL_PATH)).toBe(fs.existsSync(FULL_PATH))

    // remove some directory.
    await cogen.actions.execute.directory.rmdir(FULL_PATH)
    expect(fs.existsSync(FULL_PATH)).toBeFalsy()
    expect(await cogen.actions.execute.directory.existsDir(FULL_PATH)).toBe(fs.existsSync(FULL_PATH))

});

test('test for move path and current path variables', async () => {
    const DIRECTORY_NAME = 'CLOVERHEARTS_AT_JUKJEON'
    const ORIGINAL_PATH = `${cogen.cwd}`
    const FULL_PATH = path.join(`${cogen.cwd}`, `${DIRECTORY_NAME}`)
    
    expect(await cogen.actions.execute.directory.pwd).toBeTruthy()
    
    const currentPath = await cogen.actions.execute.directory.pwd()
    await cogen.actions.execute.directory.mkdir(FULL_PATH)
    
    // move to new path
    await cogen.actions.execute.directory.cd(FULL_PATH)
    expect(await cogen.actions.execute.directory.pwd()).not.toBe(currentPath)
    expect(await cogen.actions.execute.directory.pwd()).toBe(FULL_PATH)
    await cogen.actions.execute.directory.cd(ORIGINAL_PATH)
    expect(await cogen.actions.execute.directory.pwd()).toBe(currentPath)
    await cogen.actions.execute.directory.rmdir(FULL_PATH)
})