// Lambda for converting a callers phone number into possible vanity numbers
// The program saves top 5 in DynamoDB and returns top 3
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

// Define your table name here
const tableName = 'vanityNumbers';

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

//Scoring Vanity Numbers Based on Vowels
const scoreVanityNumber = (vanityNumber) => { 
  // Simple scoring based on the number of vowels (A, E, I, O, U)
  return vanityNumber.split('').filter(char => 'AEIOU'.includes(char)).length; 
};

// Generate all possible vanity numbers
const generateVanityNumbers = (phoneNumber) => { // generate all possible vanity numbers
  const numberCombo = []; // array to hold all possible vanity numbers

  const backtrack = (index, path) => {  // backtrack function to generate all possible vanity numbers
    if (index === phoneNumber.length) { // if we reached the end of the phone number
      numberCombo.push(path); // add path to combo
      return;
    }

    const digit = phoneNumber[index]; // Get current digit
    if (phoneKeypad[digit]) { // If the digit is in the map
      for (const char of phoneKeypad[digit]) { // Iterate through all possible letters
        backtrack(index + 1, path + char); // Add letter to path and move to next digit
      }
    } else {
      backtrack(index + 1, path + digit); // If the digit is not in the map, keep it as is
    }
  };

  backtrack(0, ''); // Initialize backtrack with index 0 and empty path
  return numberCombo; // Return all possible vanity numbers
};

// Select Best Vanity Numbers
const selectBestVanityNumbers = (vanityNumbers) => {
  // Score vanity numbers
  const scoredNumbers = vanityNumbers.map(vanityNumber => ({
    number,
    score: scoreVanityNumber(number)
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
