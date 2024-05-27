const { handler } = require('./index'); // Adjust the path as needed

const runTest = async (testInput, expectedOutput) => { 
  const event = testInput;
  const response = await handler(event);

  console.log('Test Input:', JSON.stringify(testInput)); 
  console.log('Expected Output:', JSON.stringify(expectedOutput));
  console.log('Actual Output:', JSON.stringify(response));
  console.log(response.statusCode === expectedOutput.statusCode && JSON.stringify(response.body) === JSON.stringify(expectedOutput.body) ? 'Test Passed' : 'Test Failed');
};

// Test Case 1
runTest(
  { phoneNumber: "228" }, // Typical phone number with corresponding vanity numbers
  {
    statusCode: 200,
    body: JSON.stringify({ phoneNumber: "228", topVanityNumbers: ["CAT", "BAT", "ACT"] }) 
  }
);

// Test Case 2
runTest(
  {}, // Error case where the input is invalid
  {
    statusCode: 400,
    body: JSON.stringify({ message: "Phone number is required" })
  }
);

// Test Case 3
runTest(
  { phoneNumber: "201" }, // Phone number to test that do not map to any letters
  {
    statusCode: 200,
    body: JSON.stringify({ phoneNumber: "201", topVanityNumbers: ["201"] })
  }
);
