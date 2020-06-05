const osLocale = require('os-locale');
const fs = require('fs')
const path = require('path')
let LOCALE = null
let OS_LOCALE = null

if (!OS_LOCALE) {
  const LOCALE_RAW = fs.readFileSync(path.join(__dirname, '../../../../meta/locale.json'))
  LOCALE = JSON.parse(LOCALE_RAW)
  osLocale().then(locale => {
    OS_LOCALE = locale.split('-')[0]
  })
}

exports.OS_LOCALE = () => OS_LOCALE

exports.LOCALE = (localePath) => {
  const tokens = localePath.split('.')
  const localeText = tokens.reduce((locale, token) => {
    return locale[token]
  }, LOCALE)
  return localeText[OS_LOCALE] || localeText['en'] || 'BROKEN_LOCALE'
}
