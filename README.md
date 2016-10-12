# build-sugarss

[![apm](https://img.shields.io/apm/l/build-sugarss.svg?style=flat-square)](https://atom.io/packages/build-sugarss)
[![apm](https://img.shields.io/apm/v/build-sugarss.svg?style=flat-square)](https://atom.io/packages/build-sugarss)
[![apm](https://img.shields.io/apm/dm/build-sugarss.svg?style=flat-square)](https://atom.io/packages/build-sugarss)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-sugarss.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-sugarss)
[![David](https://img.shields.io/david/idleberg/atom-build-sugarss.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-sugarss#info=dependencies)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-sugarss.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-sugarss?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `postcss/sugarss`, compiles SugarSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-sugarss` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-sugarss`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-sugarss`:

```bash
$ git clone https://github.com/idleberg/atom-build-sugarss build-sugarss
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `SugarSS` — compile script
* `SugarSS --map` — compile script and create a map
* `SugarSS --watch` — compile script and keep watching
* `SugarSS --map --watch` — compile script, create a map and keep watching

The name of the output file can be overridden in your `config.cson`, all [standard replacements](https://github.com/noseglid/atom-build#replacements) can be used:

```cson
"build-sugarss":
  outputFile: "{FILE_ACTIVE_NAME_BASE}.css"
```

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-sugarss) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
