# build-sugarss

[![apm](https://flat.badgen.net/apm/license/build-sugarss)](https://atom.io/packages/build-sugarss)
[![apm](https://flat.badgen.net/apm/v/build-sugarss)](https://atom.io/packages/build-sugarss)
[![apm](https://flat.badgen.net/apm/dl/build-sugarss)](https://atom.io/packages/build-sugarss)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-build-sugarss)](https://circleci.com/gh/idleberg/atom-build-sugarss)
[![David](https://flat.badgen.net/david/dev/idleberg/atom-build-sugarss)](https://david-dm.org/idleberg/atom-build-sugarss?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `postcss/sugarss`, compiles SugarSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-sugarss` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-sugarss`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
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

This work is licensed under the [The MIT License](LICENSE).
