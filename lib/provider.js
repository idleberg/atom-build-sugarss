'use babel';

import {exec} from 'child_process';

// Package settings
import meta from '../package.json';
const debug = atom.config.get(`${meta.name}.debug`);
const notEligible = `**${meta.name}**: \`postcss\` is not in your PATH`;
const outputFile = atom.config.get('build-sugarss.outputFile') || '{FILE_ACTIVE_NAME_BASE}.css';

// This package depends on build, make sure it's installed
module.exports = {
  activate() {
    require('atom-package-deps').install(meta.name);
  }
};

export function provideBuilder() {
  return class SugarssProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'PostCSS';
    }

    isEligible() {
      exec('postcss --version', function (error, stdout, stderr) {
        if (error !== null) {
          // No PostCSS installed
          if (debug === true) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (debug === true) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
      });

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
