const path = require('path');

function hydrateManifest(root, manifest) {
  return {
    ...manifest,
    modules: manifest.modules.map(module => {
      const { files } = module;
      const absoluteFiles = files.map(file => path.resolve(root, file));
      const moduleExports = absoluteFiles.map(require);
      return { ...module, absoluteFiles, moduleExports };
    }),
  };
}

module.exports = hydrateManifest;
