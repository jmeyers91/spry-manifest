
function manifestToOptions(manifest) {
  return manifest.modules.reduce((options, module) => {
    if(module.singleton) {
      options[module.optionsKey] = module.moduleExports[0];
    } else {
      options[module.optionsKey] = module.moduleExports;
    }
    return options;
  }, {});
}

module.exports = manifestToOptions;
