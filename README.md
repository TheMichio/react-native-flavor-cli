# react-native-flavor-cli

this package will run your android react-native project based on you choice of flavors and dimensions

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/react-native-flavor-cli.svg)](https://npmjs.org/package/react-native-flavor-cli)
[![Downloads/week](https://img.shields.io/npm/dw/react-native-flavor-cli.svg)](https://npmjs.org/package/react-native-flavor-cli)
[![License](https://img.shields.io/npm/l/react-native-flavor-cli.svg)](https://github.com/Projects/react-native-flavor-cli/blob/master/package.json)

<!-- toc -->
* [react-native-flavor-cli](#react-native-flavor-cli)
* [Setup](#setup)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Setup

<!-- setup -->

First install the react-native-flavor-cli in global mode

```sh-session
  npm install -g react-native-flavor-cli
```

OR

```sh-session
  yarn global add react-native-flavor-cli
```

and then add needed gradle task to the `android/app/build.gradle` file

```groovy
task saveRnfcliData () {
   group "rnfcli"
   def flavorsDetail = []
   def dimensions = []
   doLast {
       android.productFlavors.all {flavor ->
           def temp = ["${flavor.name}" , "${flavor.dimension}"]
           flavorsDetail.add(temp)
           if(!dimensions.contains("${flavor.dimension}")){
               dimensions.add("${flavor.dimension}")
           }
       }
       def flavorDetailsJson = JsonOutput.toJson(flavorsDetail)
       println flavorDetailsJson
       def productFlavorsFile = new File("../flavors.json")
       productFlavorsFile.deleteOnExit()

       productFlavorsFile.write(flavorDetailsJson.toString())

       def dimensionsJson = JsonOutput.toJson(dimensions)
       def dimensionsFile = new File("../dimensions.json")
       dimensionsFile.deleteOnExit()
       dimensionsFile.write(dimensionsJson.toString())
   }
}
```

and then import `groovy.json.JsonOutput` in `android/app/build.gradle` file
your `android/app/build.gradle` should be somthing like this :

```groovy
apply plugin: "com.android.application"

import com.android.build.OutputFile
import groovy.json.JsonOutput
...
...
...
...
...
task saveRnfcliData () {
   group "rnfcli"
   def flavorsDetail = []
   def dimensions = []
   doLast {
       android.productFlavors.all {flavor ->
           def temp = ["${flavor.name}" , "${flavor.dimension}"]
           flavorsDetail.add(temp)
           if(!dimensions.contains("${flavor.dimension}")){
               dimensions.add("${flavor.dimension}")
           }
       }
       def flavorDetailsJson = JsonOutput.toJson(flavorsDetail)
       println flavorDetailsJson
       def productFlavorsFile = new File("../flavors.json")
       productFlavorsFile.deleteOnExit()

       productFlavorsFile.write(flavorDetailsJson.toString())

       def dimensionsJson = JsonOutput.toJson(dimensions)
       def dimensionsFile = new File("../dimensions.json")
       dimensionsFile.deleteOnExit()
       dimensionsFile.write(dimensionsJson.toString())
   }
}
preBuild.dependsOn(saveRnfcliData)
```

### Important

and then sync gradle in android studio, new task will be added to rnfcli group in gradle panel, when gradle sync finished open gradle panel and open app -> rnfcli, right click on saveRnfcliData and choose `Execute Before Build`.

after all these steps open a cmd/terminal in your react-native project root directory and run this command :

```sh-session
rnf-cli init
```

# Usage

<!-- usage -->
```sh-session
$ npm install -g react-native-flavor-cli
$ rnf-cli COMMAND
running command...
$ rnf-cli (-v|--version|version)
react-native-flavor-cli/1.0.4 darwin-x64 node-v8.11.4
$ rnf-cli --help [COMMAND]
USAGE
  $ rnf-cli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`rnf-cli build-android`](#rnf-cli-build-android)
* [`rnf-cli clean-android`](#rnf-cli-clean-android)
* [`rnf-cli help [COMMAND]`](#rnf-cli-help-command)
* [`rnf-cli init`](#rnf-cli-init)
* [`rnf-cli reset`](#rnf-cli-reset)
* [`rnf-cli run-android`](#rnf-cli-run-android)
* [`rnf-cli start`](#rnf-cli-start)

## `rnf-cli build-android`

Generate Apk based on your flavor choices

```
USAGE
  $ rnf-cli build-android

DESCRIPTION
  ...
  This command will ask you name of product flavors based on dimensions from build.gradle file and then generates new 
  apk for you.
```

_See code: [src/commands/build-android.js](https://github.com/TheMichio/react-native-flavor-cli/blob/v1.0.4/src/commands/build-android.js)_

## `rnf-cli clean-android`

Cleans Your Android Project

```
USAGE
  $ rnf-cli clean-android

DESCRIPTION
  ...
  This will run gradle clean in android folder of your react-native project
```

_See code: [src/commands/clean-android.js](https://github.com/TheMichio/react-native-flavor-cli/blob/v1.0.4/src/commands/clean-android.js)_

## `rnf-cli help [COMMAND]`

display help for rnf-cli

```
USAGE
  $ rnf-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_

## `rnf-cli init`

Setup Rnf-cli in you react-native project

```
USAGE
  $ rnf-cli init

OPTIONS
  -e, --entryfile=entryfile  react-native project entry file

DESCRIPTION
  ...
  This will create new rnf-config.json in your root folder of your project, please add this to your git.
```

_See code: [src/commands/init.js](https://github.com/TheMichio/react-native-flavor-cli/blob/v1.0.4/src/commands/init.js)_

## `rnf-cli reset`

This will run react-native start -- --reset-cache

```
USAGE
  $ rnf-cli reset

DESCRIPTION
  ...
  Command for reseting metro bundler and restarting it.
```

_See code: [src/commands/reset.js](https://github.com/TheMichio/react-native-flavor-cli/blob/v1.0.4/src/commands/reset.js)_

## `rnf-cli run-android`

This will run your react-native android project based on your product flavor choices

```
USAGE
  $ rnf-cli run-android

OPTIONS
  -f, --fresh=fresh  use fresh run options, user true or false

DESCRIPTION
  ...
  For running your react-native android app with rnf-cli please follow the steps in documentation.
```

_See code: [src/commands/run-android.js](https://github.com/TheMichio/react-native-flavor-cli/blob/v1.0.4/src/commands/run-android.js)_

## `rnf-cli start`

This will run react-native start in your current working directory (process.cwd)

```
USAGE
  $ rnf-cli start

DESCRIPTION
  ...
  Please make sure you are in the right project folder when you want to use this command.
```

_See code: [src/commands/start.js](https://github.com/TheMichio/react-native-flavor-cli/blob/v1.0.4/src/commands/start.js)_
<!-- commandsstop -->

- [`rnf-cli build-android`](#rnf-cli-build-android)
- [`rnf-cli clean-android`](#rnf-cli-clean-android)
- [`rnf-cli init`](#rnf-cli-init)
- [`rnf-cli reset`](#rnf-cli-reset)
- [`rnf-cli run-android`](#rnf-cli-run-android)
- [`rnf-cli start`](#rnf-cli-start)

## `rnf-cli build-android`

Generate Apk based on your flavor choices

```
USAGE
  $ rnf-cli build-android

DESCRIPTION
  ...
  This command will ask you name of product flavors based on dimensions from build.gradle file and then generates new
  apk for you.
```

_See code: [src/commands/build-android.js](https://github.com/Projects/react-native-flavor-cli/blob/v0.0.0/src/commands/build-android.js)_

## `rnf-cli clean-android`

Cleans Your The Android Project

```
USAGE
  $ rnf-cli clean-android

DESCRIPTION
  ...
  This will run gradle clean in andorid folder of your react-native project
```

_See code: [src/commands/clean-android.js](https://github.com/Projects/react-native-flavor-cli/blob/v0.0.0/src/commands/clean-android.js)_

## `rnf-cli help [COMMAND]`

display help for rnf-cli

```
USAGE
  $ rnf-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_

## `rnf-cli init`

Setup Rnf-cli in you react-native project

```
USAGE
  $ rnf-cli init

OPTIONS
  -e, --entryfile=entryfile  react-native project entry file

DESCRIPTION
  ...
  This will create new rnf-config.json in your root folder of your project, please add this to your git.
```

_See code: [src/commands/init.js](https://github.com/Projects/react-native-flavor-cli/blob/v0.0.0/src/commands/init.js)_

## `rnf-cli reset`

This will run react-native start -- --reset-cache

```
USAGE
  $ rnf-cli reset

DESCRIPTION
  ...
  Command for reseting metro bundler and restarting it.
```

_See code: [src/commands/reset.js](https://github.com/Projects/react-native-flavor-cli/blob/v0.0.0/src/commands/reset.js)_

## `rnf-cli run-android`

This will run your react-native android project based on your product flavor choices

```
USAGE
  $ rnf-cli run-android

OPTIONS
  -f, --fresh=fresh  use fresh run options, user true or false

DESCRIPTION
  ...
  For running your react-native android app with rnf-cli please follow the steps in documentation.
```

_See code: [src/commands/run-android.js](https://github.com/Projects/react-native-flavor-cli/blob/v0.0.0/src/commands/run-android.js)_

## `rnf-cli start`

This will run react-native start in your current working directory (process.cwd)

```
USAGE
  $ rnf-cli start

DESCRIPTION
  ...
  Please make sure you are in the right project folder when you want to use this command.
```

_See code: [src/commands/start.js](https://github.com/Projects/react-native-flavor-cli/blob/v0.0.0/src/commands/start.js)_
