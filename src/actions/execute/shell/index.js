const { exec } = require("child_process")

function shellExec(command, opts) {
  return new Promise((resolve, reject) => {
    try {
      process.chdir(targetDirectory);
    } catch (error) {
      reject(`cannot access directory ${targetDirectory}`)
    }

    try {
      exec(
        `${command}`,
        {
          shell: true,
          cwd: opts.cwd ? opts.cwd : null,
        },
        (error) => {
          if (error) {
            reject(error)
          }
          resolve(stdout)
        }
      );
    } catch (error) {}
  })
}

module.exports = {
  shellExec,
}
