module.exports = async (selected, cogen) => {
  const description = {
    en: 'Common web browser runtime language',
    ko: '일반적으로 사용되는 브라우저 실행 언어입니다'
  }[cogen.actions.utils.locale.OS_LOCALE()]

  return {
    title: 'Javascript',
    description: description,
    value: { name: 'javascript', execute: [], runner: async (meta, cogen) => {
      const config = meta._output
      const indexjs = cogen.actions.execute.config.jsConfig
      config._files['index.js'] = new indexjs({ projectName: cogen.projectName })
      config._files['src/.keep'] = 'source directory'
    } }
  }
}