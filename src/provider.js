import { configSchema, getConfig } from './config';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';
import meta from '../package.json';

export { configSchema as config };

export function provideBuilder() {
  return class SugarssProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'PostCSS';
    }

    isEligible() {
      if (getConfig('alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['postcss']);

      return !cmd?.stdout?.toString()
        ? false
        : true;
    }

    settings() {
      const outputFile = getConfig('outputFile');
      const errorMatch = [
        '(?<file>([^:]+)):(?<line>\\d+):(?<col>\\d+): (?<message>.+)'
      ];

      return [
        {
          name: 'SugarSS',
          exec: 'postcss',
          args: [ '--use', 'autoprefixer', '--parser', 'sugarss', '{FILE_ACTIVE}', '--output', outputFile ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'sugarss:compile',
          errorMatch: errorMatch
        },
        {
          name: 'SugarSS --map',
          exec: 'postcss',
          args: [ '--use', 'autoprefixer', '--parser', 'sugarss', '{FILE_ACTIVE}', '--output', outputFile, '--no-map.inline' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'sugarss:compile-with-map',
          errorMatch: errorMatch
        },
        {
          name: 'SugarSS --watch',
          exec: 'postcss',
          args: [ '--use', 'autoprefixer', '--parser', 'sugarss', '{FILE_ACTIVE}', '--output', outputFile, '--watch' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'sugarss:compile-and-watch',
          errorMatch: errorMatch
        },
        {
          name: 'SugarSS --map --watch',
          exec: 'postcss',
          args: [ '--use', 'autoprefixer', '--parser', 'sugarss', '{FILE_ACTIVE}', '--output', outputFile, '--no-map.inline', '--watch' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'sugarss:compile-with-map-and-watch',
          errorMatch: errorMatch
        }
      ];
    }
  };
}

// This package depends on build, make sure it's installed
export function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
