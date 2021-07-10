import { configSchema, getConfig } from './config';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import { name } from '../package.json';
import which from 'which';

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
        Logger.log('Always eligible');
        return true;
      }

      if (which.sync('postcss', { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
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

export function activate() {
  Logger.log('Activating package');

  // This package depends on build, make sure it's installed
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(name);
  }
}

export function deactivate() {
  Logger.log('Deactivating package');
}
