// Lambda for converting a callers phone number into possible vanity numbers
// the program saves the top 5 results to DynamoDB and returns the top 3

const dictionary = require('./wordlist.json')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const dialpadMap = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ'
}

// Extracts a random character from an array or string
exports.getRandomChar = (array) => { 
  return array.split('')[Math.floor(Math.random() * array.length)] 
}

// Matches Callers number against the dictionary and returns the best match for the number
exports.numberToWords = (dictionary, userNumber) => { 
  const vanityNumbers = []

// Helper function to count vowels in a string to define "best"
  const countVowels = (str) => {
    const vowels = 'AEIOUaeiou'; 
    return str.split('').filter(char => vowels.includes(char)).length;
  }  
  for (const word in dictionary) { // Loop through the dictionary
    if (userNumber.includes(dictionary[word].number)) { // If the number matches the number in the dictionary
      const vanityNumber = userNumber.replace(dictionary[word].number, dictionary[word].word.toUpperCase()) // Replace the number with the word
      const formattedNumber = vanityNumber.slice(0, 3) + '-' + vanityNumber.slice(3, 6) + '-' + vanityNumber.slice(6, 10) // Format the number
      vanityNumbers.push(formattedNumber) // Add the number to the array
    }
  }

  while (vanityNumbers.length < 5) { // Loop until we have 5 numbers
    let randomNumber = exports.getRandomChar(userNumber) // Get a random number from the userNumber
    if (randomNumber != '0' && randomNumber != '1') { // Don't replace 0 or 1
      let newNumber = userNumber.replace(randomNumber, exports.getRandomChar(dialpadMap[randomNumber]))  

      if (!vanityNumbers.includes(newNumber)) { // If the number is not already in the array
        vanityNumbers.push(newNumber) // Add the number to the array
      }
    }
  }
  return (vanityNumbers.slice(0, 5))
}

// Connect to DynamoDB to save the results
exports.handler = async (event, context, callback) => {

  const callerNumber = event.Details.Parameters.userNumber.replace('+1', '') //

  const vanityNumbers = exports.numberToWords(wordlist, callerNumber) // Convert the number to words

  const resultMap = { // Map the results to a JSON object 
    vanityNumber1: vanityNumbers[0],
    vanityNumber2: vanityNumbers[1],
    vanityNumber3: vanityNumbers[2]
  }
  callback(null, resultMap);

  const params = {
    TableName: 'callers',
    Item: {
      id: callerNumber,
      vanityNumbers: vanityNumbers,
      timestamp: Date.now()
    }
  }

  try {
    const data = await documentClient.put(params).promise() // Save the data to DynamoDB
    console.log(data) // Print the data to the console
  } catch (err) {
    console.log(err)
  }
}