const {Command, flags} = require('@oclif/command')
const prompts = require('../runAndrodSrc/prompts')
var {spawn} = require('child_process')

var isWin = process.platform === 'win32'
var reactNativeCommand = isWin ? 'react-native.cmd' : 'react-native'

class RunAndroidCommand extends Command {
  async run() {
    const {flags} = this.parse(RunAndroidCommand)
    const isFresh = flags.fresh
    if (
      isFresh === 'true' ||
      isFresh === 'TRUE' ||
      isFresh === 'false' ||
      isFresh === 'FALSE'
    ) {
      this.log('ok')
    } else {
      this.warn('Running the app with last used run option')
    }

    prompts.init()

    const result = await prompts.askAllQuestions()
    var actionString = result.choiceString
    actionString += 'Debug'
    this.log(actionString)
    var runOptions = {
      applicationVariant: `--variant=${actionString}`,
    }
    let runAndroidProcess = spawn(`${reactNativeCommand}`, [
      'run-android',
      runOptions.applicationVariant,
    ])
    process.stdin.pipe(runAndroidProcess.stdin)
    runAndroidProcess.stdout.pipe(process.stdout)
    runAndroidProcess.stderr.pipe(process.stderr)
    runAndroidProcess.on('exit', () => {
      process.exit()
    })
  }
}

RunAndroidCommand.description = `This will run your react-native android project based on your product flavor choices
...
For running your react-native android app with rnf-cli please follow the steps in documentation.
`

RunAndroidCommand.flags = {
  fresh: flags.string({
    char: 'f',
    description: 'use fresh run options, user true or false',
  }),
}

module.exports = RunAndroidCommand
