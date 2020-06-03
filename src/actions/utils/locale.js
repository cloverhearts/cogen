import osLocale from 'os-locale';
const LOCALE = require('../../../meta/locale.json')
let OS_LOCALE = null

export default async (path) => {
  if (!OS_LOCALE) {
    OS_LOCALE = (await osLocale()).split('-')[0]
  }

  const tokens = path.split('.')
  const localeText = tokens.reduce((locale, token) => {
    return locale[token]
  }, LOCALE)
  return localeText[OS_LOCALE] || localeText['en'] || 'BROKEN_LOCALE'
}
