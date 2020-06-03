async function createOptions(program, actions) {
  return 
}

export default async (actions) => {
  const program = await createOptions(commander.program, actions)
  return { program }
}
