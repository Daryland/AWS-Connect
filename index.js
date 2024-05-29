// Lambda for converting a callers phone number into possible vanity numbers
// The program saves top 5 in DynamoDB and returns top 3
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient();

// Import the dictionary.json file
const dictionary = require('./wordlist.json');
// console.log(dictionary);

// Define your table name here
const tableName = 'vanityNumbers';
// console.log(tableName);

// define digits to letters
// Characters are represented as strings // Easier access
// Can also be represented as an array of characters 
const phoneKeypad = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ'
}

// console.log(phoneKeypad);

// Extracts a random character from an array or string
exports.getRandomChar = (array) => { // array can be a string or an array
  return array.split('')[Math.floor(Math.random() * array.length)]; // returns a random character//Splitting an array into a string
}
// console.log("This is my random Character" + exports.getRandomChar('ABC'));

// Matches the callers phone number against all words in the english language
exports.numberToWords = (dictionary, userNumber) => { // dictionary is a json file
  const vanityNumbers = []; // array to store vanity numbers


// Helper function to count vowels in a string to define "best"
 const countVowels = (str) => { // 
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
 
  while (vanityNumbers.length < 5) { 
    let randomNumber = exports.getRandomChar(userNumber);
    if (randomNumber !== '0' && randomNumber !== '1') {
      let newNumber = userNumber.replace(randomNumber, exports.getRandomChar(phoneKeypad[randomNumber])); // Replace the number with a random character
      if (!vanityNumbers.includes(newNumber)) { // If the number is not already in the array
        vanityNumbers.push(newNumber); // Add the number to the array
      }
    }
  }

  // Sort vanity numbers based on the number of vowels
  vanityNumbers.sort((a, b) => countVowels(b) - countVowels(a));

  return vanityNumbers.slice(0, 5); // return top 5 vanity numbers
}


// Select Best Vanity Numbers
const selectBestVanityNumbers = (vanityNumbers) => {
  // Score vanity numbers
  const scoredNumbers = vanityNumbers.map(vanityNumber => ({
    number: vanityNumber,
    score: scoreVanityNumber(vanityNumber)
  }));
  
  // Sort vanity numbers by score in descending order
  scoredNumbers.sort((a, b) => b.score - a.score);
  // Select top 5 vanity numbers
  return scoredNumbers.slice(0, 5).map(item => item.number);  // returns an array containing the number 
  // values of the first 5 objects in the scoredNumbers array.
};

// Lambda Handler Function 
exports.handler = async (event) => { // async handler function to handle incoming events
  const phoneNumber = event.phoneNumber; // Get phone number from event

  if (!phoneNumber) { // If phone number is not provided
    return {
      statusCode: 400, 
      body: JSON.stringify({ message: 'Phone number is required' }) // Return error message
    };
  }

  const vanityNumbers = generateVanityNumbers(phoneNumber); // Generate all possible vanity numbers
  const bestVanityNumbers = selectBestVanityNumbers(vanityNumbers);  // Select best vanity numbers

  const params = { // Save best vanity numbers to DynamoDB
    TableName: tableName, // Table name defined above
    Item: { // Item to save to DynamoDB
      PhoneNumber: phoneNumber,  // Phone number to save
      VanityNumbers: bestVanityNumbers // Best vanity numbers to save
    }
  };

  try { // Try to save to DynamoDB
    await dynamo.put(params).promise(); // Save to DynamoDB
    return { // Return best vanity numbers
      statusCode: 200,
      body: JSON.stringify({ // Return best vanity numbers
        phoneNumber,
        topVanityNumbers: bestVanityNumbers.slice(0, 3) // Return top 3 vanity numbers
      })
    };
  } catch (error) { 
    console.error(error); //If error, log error
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving to DynamoDB' })
    };
  }
};
