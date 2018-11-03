const Prompt = require('prompt-checkbox')
var utils = require('./utils')
const fs = require('fs')

utils.init()
var processDir = process.cwd()
var dimensionJson = null
var flavorsJson = null
var dimensionFlavorDic = {}

var questions = []

function init() {
  dimensionJson = JSON.parse(
    fs.readFileSync(processDir + '/android/dimensions.json', 'utf-8')
  )
  flavorsJson = JSON.parse(
    fs.readFileSync(processDir + '/android/flavors.json'),
    'utf-8'
  )

  for (var dimension in dimensionJson) {
    if (dimensionJson.hasOwnProperty(dimension)) {
      let tempDimension = dimensionJson[dimension]
      let tempDimensionDic = []
      for (var flavor in flavorsJson) {
        if (flavorsJson[flavor][1] === tempDimension) {
          tempDimensionDic.push(flavorsJson[flavor][0])
        }
      }
      dimensionFlavorDic[tempDimension] = tempDimensionDic
    }
  }
  getAllQuestions()
}

function getDimensionsJson() {
  return dimensionJson
}
function getFlavorsJson() {
  return flavorsJson
}

function getAllQuestions() {
  for (var dimension in dimensionFlavorDic) {
    if (dimensionFlavorDic.hasOwnProperty(dimension)) {
      const itemIndex = dimension
      const prompt = new Prompt({
        name: itemIndex,
        message: `which kind of ${itemIndex}??`,
        choices: dimensionFlavorDic[itemIndex],
        default: dimensionFlavorDic[itemIndex][0],
      })
      questions.push(prompt)
    }
  }
  return questions
  // questions.reverse()
}
async function askAllQuestions() {
  var choiceString = ''
  var choices = []
  for (var questionIndex in questions) {
    if (questions.hasOwnProperty(questionIndex)) {
      let ans = await questions[questionIndex].run()
      if (questionIndex == 0) {
        choiceString += ans[0]
      } else {
        choiceString += ans[0].capitalize()
      }
      choices.push(ans[0])
    }
  }
  const result = {
    choices: choices,
    choiceString: choiceString,
  }
  return result
}

module.exports = {
  init: init,
  getAllQuestions: getAllQuestions,
  askAllQuestions: askAllQuestions,
  getDimensionsJson: getDimensionsJson,
  getFlavorsJson: getFlavorsJson,
}
