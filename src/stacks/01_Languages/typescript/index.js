module.exports = async (selected, cogen) => {
  const description = {
    en: '',
    ko: ''
  }[cogen.actions.utils.locale.OS_LOCALE()]

  return {
    title: 'Typescript',
    description: description,
    value: { name: 'typescript', execute: [], disabled: true }
  }
}