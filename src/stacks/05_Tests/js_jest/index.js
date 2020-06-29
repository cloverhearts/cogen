module.exports = async (selected, cogen) => {
  const description = {
    en: 'Jest is delightful JavaScript Testing Framework(popular) (https://jestjs.io/)',
    ko: '제스트는 인기있는 Javascript 테스팅 프레임워크 입니다(인기) (https://jestjs.io/)'
  }[cogen.actions.utils.locale.OS_LOCALE()]

  const allowLanguages = ['javascript']

  if (!allowLanguages.includes(selected.language.value.name)) {
    return null
  }

  return {
    title: 'Support Jest test framework',
    description: description,
    value: { name: 'js_jest', runner: async (meta, cogen) => {
      const config = meta._output
      config._packageJSON.set('devDependencies.jest', '^26.1.0')
      
      config._packageJSON.set('scripts.test', 'npm-run-all test:*')
      config._packageJSON.set('scripts.test:unit-test', 'jest --config jest.config.js')

      const jsonConfig = cogen.actions.execute.config.jsConfig
      config._files['jest.config.js'] = new jsonConfig({ clearMocks: true, coverageDirectory: "coverage", testEnvironment: "jsdom" })
      config._files['tests/index.test.js'] = `
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
      `
    }}
  }
}
