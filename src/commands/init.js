const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const currentCliDir = process.cwd()
const {spawn} = require('child_process')
const isWin = process.platform === 'win32'
const prompts = require('../runAndrodSrc/prompts')
const readlineSync = require('readline-sync')

const gradleCommand = isWin ? 'gradlew' : 'gradle'
var dimensionsJson
var flavorsJson

class InitCommand extends Command {
  async run() {
    const {flags} = this.parse(InitCommand)
    let entryfile = flags.entryfile || 'index.js'

    // check if this is a react-native project
    if (!this.isReactNativeProject()) {
      this.error('notReactNativeFolder')
    }

    this.runRnfCliTask()
    prompts.init()

    dimensionsJson = prompts.getDimensionsJson()
    flavorsJson = prompts.getFlavorsJson()

    let userAnswer = false

    if (entryfile === 'index.js') {
      let question = readlineSync.question(
        'Using index.js as entryfile , Are you sure? [Y/n]\n'
      )
      if (question === '') {
        userAnswer = true
      } else if (question === 'Y' || question === 'y') {
        userAnswer = true
      } else if (question === 'n' || question === 'N') {
        userAnswer = false
      } else {
        userAnswer = true
      }
    }

    if (userAnswer === false) {
      process.exit()
    }

    let configs = {
      entryfile: entryfile,
      dimensions: dimensionsJson,
      flavors: flavorsJson,
    }
    fs.writeFileSync(
      currentCliDir + '/.rnf-configs.json',
      JSON.stringify(configs, null, 2)
    )
  }

  runRnfCliTask() {
    const runRnfCliTaskProcess = spawn(
      ` cd android/app && ${gradleCommand}`,
      ['saveRnfcliData'],
      {shell: true}
    )
    process.stdin.pipe(runRnfCliTaskProcess.stdin)
    runRnfCliTaskProcess.stdout.pipe(process.stdout)
    runRnfCliTaskProcess.stderr.pipe(process.stderr)
    runRnfCliTaskProcess.on('exit', () => {
      process.exit()
    })
  }

  isReactNativeProject() {
    const reactNativeFolder = currentCliDir + '/node_modules/react-native'
    if (fs.existsSync(reactNativeFolder)) {
      return true
    }
    return false
  }
}

InitCommand.description = `Setup Rnf-cli in you react-native project

...
This will create new rnf-config.json in your root folder of your project, please add this to your git.
`

InitCommand.flags = {
  entryfile: flags.string({
    char: 'e',
    description: 'react-native project entry file',
  }),
}

module.exports = InitCommand
