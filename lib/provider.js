'use babel';

import { install } from 'atom-package-deps';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';
const outputFile = atom.config.get('build-sugarss.outputFile') || '{FILE_ACTIVE_NAME_BASE}.css';

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class SugarssProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'PostCSS';
    }

    isEligible() {
      try {
        spawnSync('postcss --version');
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
        return false;
      }

      return true;
    }

    settings() {
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
