const osLocale = require('os-locale');
const fs = require('fs')
const path = require('path')
let LOCALE = null
let OS_LOCALE = null

module.exports = async (localePath) => {
  if (!OS_LOCALE) {
    const LOCALE_RAW = await fs.readFileSync(path.join(__dirname, '../../../../meta/locale.json'))
    LOCALE = JSON.parse(LOCALE_RAW)

    OS_LOCALE = (await osLocale()).split('-')[0]
  }

  const tokens = localePath.split('.')
  const localeText = tokens.reduce((locale, token) => {
    return locale[token]
  }, LOCALE)
  return localeText[OS_LOCALE] || localeText['en'] || 'BROKEN_LOCALE'
}
