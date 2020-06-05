const npmPackageJSON = require('./model/PackageJSON')

const os = require("os");
const { exec } = require("child_process");
const { shellExec } = require("../shell");
const npmCommand = os.platform() === "win32" ? "npm.cmd" : "npm";
const ALLOW_NPM_INSTALL_MODES = [
  "--save-dev",
  "--save-prod",
  "--save-optional",
  '' // install to all packages.
];
const DEFAULT_NPM_INSTALL_MODE = "--save-prod";

function getDefaultPackageJSON() {
  return new npmPackageJSON()
}

/**
 * Common npm install command function.
 * @param {String} targetDirectory 
 * @param {Array[String]} packages 
 * @param {String} _mode 
 * @param {Object} opts 
 */
async function _npmInstall(targetDirectory, packages, _mode = '', opts) {
  const MODE =
    ALLOW_NPM_INSTALL_MODES.includes(_mode) || DEFAULT_NPM_INSTALL_MODE;
  return new Promise((resolve, reject) => {
    if (!packages || packages.length <= 0) {
      reject("No packages found");
    }
    shellExec(targetDirectory, `${npmCommand} install ${MODE} ${packages.join(' ')}`, opts)
      .then((stdout) => resolve({ stdout }), (error) => reject({ error }));
  });
}

module.exports = {
  getDefaultPackageJSON,
  install: async (targetDirectory) => {
    return await _npmInstall(targetDirectory, [], '')
  },
  prodInstall: async (targetDirectory, _packages) => {
      const packages = Array.isArray(_packages) ? _packages : [ _packages ? _packages.split(' ') : '']
      return await _npmInstall(targetDirectory, packages, '--save-prod')
  },
  devInstall: async (targetDirectory, _packages) => {
    const packages = Array.isArray(_packages) ? _packages : [ _packages ? _packages.split(' ') : '']
    return await _npmInstall(targetDirectory, packages, '--save-dev')
    }
};
