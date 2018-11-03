const {Command} = require('@oclif/command')
const {spawn} = require('child_process')

var isWin = process.platform === 'win32'
var gradleCommand = isWin ? 'gradlew' : 'gradle'

class ResetCommand extends Command {
  async run() {
    let reactNativeClean = spawn('cd android && ', [`${gradleCommand} clean`], {
      shell: true,
    })
    process.stdin.pipe(reactNativeClean.stdin)
    reactNativeClean.stdout.pipe(process.stdout)
    reactNativeClean.stderr.pipe(process.stderr)
    reactNativeClean.on('exit', () => {
      process.exit()
    })
  }
}

ResetCommand.description = ` Cleans Your Android Project
...
This will run gradle clean in android folder of your react-native project
`

ResetCommand.flags = {}

module.exports = ResetCommand
