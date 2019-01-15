const path = require('path');
const { existsSync } = require('fs');
const globby = require('globby');

const defaultModules = [
  { type: 'setup', optionsKey: 'setup', patterns: ['spry.config.js'], singleton: true },
  { type: 'model', optionsKey: 'models', patterns: ['**/*.model.js'] },
  { type: 'router', optionsKey: 'routers', patterns: ['**/*.router.js'] },
  { type: 'action', optionsKey: 'actions', patterns: ['**/*.action.js'] },
  { type: 'seed', optionsKey: 'seeds', patterns: ['**/*.seed.js'] },
  { type: 'migration', optionsKey: 'migrations', patterns: ['**/*.migration.js'] },
  { type: 'hook', optionsKey: 'hooks', patterns: ['**/*.hook.js'] },
];

async function createAppMap(root) {
  const modules = defaultModules;
  const ignorePatterns = ['node_modules'];
  const packageInfoPath = path.resolve(root, 'package.json');
  const modulesWithFiles = await Promise.all(modules.map(async module => {
    const { patterns } = module;
    const absoluteFiles = await globby(patterns, {
      cwd: root, 
      absolute: true,
      ignore: ignorePatterns,
    });
    const files = absoluteFiles.map(file => path.relative(root, file));

    return {
      ...module,
      files,
    };
  }));

  return {
    version: existsSync(packageInfoPath) ? require(packageInfoPath).version : null,
    modules: modulesWithFiles,
  };
}

module.exports = createAppMap;
