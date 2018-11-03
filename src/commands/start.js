const {Command} = require('@oclif/command')
const {spawn} = require('child_process')

var isWin = process.platform === 'win32'
var reactNativeCommand = isWin ? 'react-native.cmd' : 'react-native'

class StartCommand extends Command {
  async run() {
    let reactNativeStartProcess = spawn(`${reactNativeCommand}`, ['start'])
    process.stdin.pipe(reactNativeStartProcess.stdin)
    reactNativeStartProcess.stdout.pipe(process.stdout)
    reactNativeStartProcess.stderr.pipe(process.stderr)
    reactNativeStartProcess.on('exit', () => {
      process.exit()
    })
  }
}

StartCommand.description = `This will run react-native start in your current working directory (process.cwd)
...
Please make sure you are in the right project folder when you want to use this command.
`

StartCommand.flags = {}

module.exports = StartCommand
