# AWS Connect Vanity Phone
<br>
<div align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Thanks_for-Stopping_In-blue">
</div>
<br>
This project involves creating an AWS Lambda function to convert phone numbers to vanity numbers, saving the best 5 resulting numbers and the caller’s number in a DynamoDB table. An Amazon Connect contact flow then retrieves and announces the top 3 vanity possibilities to the caller.

# Give it a Ring! Call: 213-596-4228

## Deliverables
1. Git repository with all code and documentation.
2. Working Amazon Connect phone number to test in the environment.

## Exercise

### 1. Lambda Function
The Lambda function converts phone numbers to vanity numbers and saves the best 5 results along with the caller’s number in a DynamoDB table.

#### Best Definition
- **Criteria**: Vowels "AEIOU" are used to filter out words for vanity numbers.
- **Handling '0' and '1'**: These numbers are managed as there are no letters associated with them.

#### Steps
1. **Keypad Mapping**: Map numbers to corresponding letters.
2. **Scoring**: Evaluate potential vanity numbers based on the presence of vowels.
3. **Generate Vanity Numbers**: Create all possible vanity combinations.
4. **Select Best Numbers**: Pick the top 5 vanity numbers based on the scoring criteria.
5. **Lambda Handler**: Main function handling AWS Lambda events and interactions with DynamoDB.

### 2. Amazon Connect Contact Flow
This flow looks at the caller’s phone number and announces the top 3 vanity possibilities returned by the Lambda function.

### 3. Writing and Documentation
Document the reasoning, struggles, and solutions throughout the project.

#### Implementation Reasoning
- **Initial Struggles**: Understanding AWS infrastructure and tools after previous negative experiences. Outside of that a lot of the documentation or tutorials that I found were 3-5 years old. 
- **Learning Curve**: Overcoming information overload and error handling with limited mentorship and experience in error handling.
- **Project Start**: Set up the AWS Connect environment, attempted web scraping with Python for the vanity number dictionary, and structured the Lambda function.

#### Challenges and Solutions
- **Software Stack Overwhelm**: Managed by focusing on sprint-based learning and leveraging available resources. Using the resources I found in [Notes](/notes.md). Whitepages for AWS services as well as Youtube links regarding linking Lambda functions to DynamoDB. Doing the same and more examples of the fully worked code to see different ways to lay the functions out. 
- **Error Handling**: Practiced through Python, utilizing Rubber Duck debugging with a whiteboard.

#### Shortcuts and Production Practices
- **Shortcuts**: Not all error handling paths are fully fleshed out. 
- **Improvements with More Time**: Better error handling, optimization of the vanity number generation, and thorough testing. I would also have been using a secondary branch instead of the "Main" branch to push code through. 