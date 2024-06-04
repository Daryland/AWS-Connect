# AWS Connect Vanity Phone Number
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

### 2. Amazon Connect Contact Flow [Connect](/Connect-Pictures/AWS-Connect-Flow.PNG)
This flow welcomes the customer into the call, moves into the Lambda function then down a prompt list. Depending on what is selected 1. Sales 2. Customer service 3. Technical support and time of day depends on where the customer is sent in the queue. If there is an error thrown it terminates the call

### 3. Writing and Documentation

## Document the reasoning, struggles, and solutions throughout the project.

#### Implementation Reasoning
The solution that seemed to be the most fitting was using Keypad mapping that loops through all words in the wordlist and attempts to match them against vowels to define "Best". '0' and '1' have no letters tied to them so making an attempt to pull a random letter for a word after a loop. 

#### Steps
1. **Keypad Mapping**: Map numbers to corresponding letters.
2. **Scoring**: Evaluate potential vanity numbers based on the presence of vowels.
3. **Generate Vanity Numbers**: Create all possible vanity combinations.
4. **Select Best Numbers**: Pick the top 5 vanity numbers based on the scoring criteria.
5. **Lambda Handler**: Main function handling AWS Lambda events and interactions with DynamoDB.

- **Project Start**: Set up the AWS Connect environment, attempted web scraping with Python for the vanity number dictionary, and structured the Lambda function.

#### Challenges and Solutions
- **Initial Struggles**: Understanding AWS infrastructure and tools after previous negative experiences. Outside of that a lot of the documentation or tutorials that I found were 3-5 years old. 
- **Learning Curve**: Overcoming information overload and error handling with limited mentorship and experience in error handling.
- **Software Stack**: Focused on sprint-based learning and leveraging available resources. Using the resources I found in [Notes](/notes.md). Whitepages for AWS services as well as Youtube links regarding linking Lambda functions to DynamoDB. Doing the same and more examples of the fully worked code to see different ways to lay the functions out. 
- **Error Handling**: Ran error handling through the python script and output that I ran to create the initial dictionary, utilizing Rubber Duck debugging with a whiteboard. Made an attempt at debugging and running through error handling with JavaScript but kept hitting road blocks. 
- **Error Handling cont**: Created 4 test cases with the intent of 3, all of the test cases passed. 
Ran line by line for JavaScript testing and failed to pass after the first few lines. Commenting out all the code below those lines and tried to get that specific spot to work I believe it was line 36(?) not too far in. I had an experienced fellow coder come try to assist me and neither of us got through that line issue, I sent him the zipped folder for him to try and fix, eventually we will sit back down and make some adjustments. 
For the AWS portion of the problem, I ran through a walkthrough of launching my own website with the lambda service, that was successful. However when i launched my own code and tried to run it through lambda that failed, I also added it into the AWS connect flow that too failed. 
For a potential fix to double check myself and my code, I found some other repositories that had the same project, I git cloned their repos and uploaded a zip of their wordlist and index.js to the lambda, that too failed. I'm not sure what I'm missing in this, maybe someone else has some good input I couldn't find anywhere else. 

#### Shortcuts and Production Practices
- **Shortcuts**: Not all error handling paths are fully fleshed out. I tried to reach out to a couple of people to see if they had any input for that might help me get past some of the errors I was dealing with but both parties lacked time. 
- **Improvements with More Time**: Better error handling, optimization of the vanity number generation, and thorough testing. I would also have been using a secondary branch instead of the "Main" branch to push code through. I made an attempt to run the code through CodeConnect and an S3 bucket but ran into some what of the same issue I had with the zip files, also it uses a lot of data and I don't want over extend myself on a free service with no ceiling. Would like more people to bounce troubleshooting off of, it seems like thats a great way to get code moving in the right direction. 