module.exports = async (selected, cogen) => {
  const description = {
    en: 'Common web browser runtime language',
    ko: '일반적으로 사용되는 브라우저 실행 언어입니다'
  }[cogen.actions.utils.locale.OS_LOCALE()]

  return {
    title: 'Javascript',
    description: description,
    value: { name: 'javascript', execute: [] }
  }
}