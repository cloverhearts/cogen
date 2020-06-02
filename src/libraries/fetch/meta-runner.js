const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import DEFAULT_META from '../../../meta/runner.json'

export default async (_meta) => {
  const meta = _meta || {}
  const metaUrl = meta['meta-url'] || DEFAULT_META['meta-url']

  try {
    if (!!metaUrl) {
      const file = await fs.readFileSync(path.join(__dirname, '../../../meta/runner.json'))
      console.log(file.toString())
      return JSON.parse(file.toString())
    } else {
      const file = await fs.readFileSync(path.join(__dirname, '../../../meta/runner.json'))
      console.log(file.toString())
      return JSON.parse(file.toString())
    }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
