const {Command} = require('@oclif/command')
const prompts = require('../runAndrodSrc/prompts')
var {spawn} = require('child_process')

var isWin = process.platform === 'win32'
var reactNativeCommand = isWin ? 'react-native.cmd' : 'react-native'
var gradleCommand = isWin ? 'gradlew' : 'gradle'

class BuildAndroidCommand extends Command {
  async run() {
    prompts.init()

    const result = await prompts.askAllQuestions()
    var choices = result.choices
    var buildActionString = 'assemble'
    for (var choice in choices) {
      if (choices.hasOwnProperty(choice)) {
        buildActionString += choices[choice].capitalize()
      }
    }
    buildActionString += 'Release'
    const buildReactNativeAndroid = spawn(
      `${reactNativeCommand} bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle && cd android && `,
      [`${gradleCommand}`, buildActionString],
      {shell: true}
    )
    process.stdin.pipe(buildReactNativeAndroid.stdin)
    buildReactNativeAndroid.stdout.pipe(process.stdout)
    buildReactNativeAndroid.stderr.pipe(process.stderr)
    buildReactNativeAndroid.on('exit', () => {
      process.exit()
    })
  }
}

BuildAndroidCommand.description = `Generate Apk based on your flavor choices
...
This command will ask you name of product flavors based on dimensions from build.gradle file and then generates new apk for you.
`

BuildAndroidCommand.flags = {}

module.exports = BuildAndroidCommand
