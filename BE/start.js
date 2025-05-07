const tsconfig = require('./tsconfig.json');
require('tsconfig-paths').register({
  baseUrl: 'dist',
  paths: tsconfig.compilerOptions.paths
});

require('./dist/src/index.js');