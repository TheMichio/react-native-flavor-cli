const {Command} = require('@oclif/command')
const {spawn} = require('child_process')

var isWin = process.platform === 'win32'
var reactNativeCommand = isWin ? 'react-native.cmd' : 'react-native'

class ResetCommand extends Command {
  async run() {
    let reactNativeStartProcess = spawn(`${reactNativeCommand}`, [
      'start',
      '--',
      '--reset-cache',
    ])
    process.stdin.pipe(reactNativeStartProcess.stdin)
    reactNativeStartProcess.stdout.pipe(process.stdout)
    reactNativeStartProcess.stderr.pipe(process.stderr)
    reactNativeStartProcess.on('exit', () => {
      process.exit()
    })
  }
}

ResetCommand.description = `This will run react-native start -- --reset-cache
...
Command for reseting metro bundler and restarting it.
`

ResetCommand.flags = {}

module.exports = ResetCommand
