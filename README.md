<div align="center"># AWS Connect VanityNumbers</div>
<br>
<div align="center">
  <a href="https://github.com/mfts/papermark/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mfts/papermark"></a>
  <img alt="Static Badge" src="https://img.shields.io/badge/Thanks_for-Stopping_In-blue">
  <a href="https://github.com/mfts/papermark/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-AGPLv3-purple"></a>
</div>


Deliverables 
1.	Git Repo with all code and documentation
2.	Working Amazon Connect phone number to test in the environment
Exercise
1.	Create a Lambda that converts phone numbers to vanity numbers and save the best 5 resulting numbers and the caller’s number in a DynamoDB table. “Best” is defined as you see fit – explain your thoughts
	I.	I decided to define “Best” by using “AEIOU” or Vowels to filter out the words used for the vanity numbers. 
	II.	Using this method needs to error handle a “0” and “1” since there are no letters associated with these numbers.
	III.	Notes for each item to see how the code is working in each section to select the top 5 vanity numbers.
2.	Create an Amazon Connect contact flow that looks at the caller’s phone number and says the 3 vanity possibilities that come back from the lambda function 
	I.	
3.	Writing and documentation 
	I.	Record your reasons for implementing the solution the way you did; struggles you face and problems you overcame. 
	i.	The initial struggles and problems that I had to overcome had to do with the software stack itself. I haven’t used anything AWS since I had my account hacked and ran up to $45,000 in a matter of days for a Minecraft server. Which in that case I had to do similar work to get up to speed in the software just to shut it down, whereas this is to build. I would say that although I’ve had a wide range of learning done in the last couple of years, it has helped that most of it has been done in sprints. The sprints have allowed me to get up to speed on what AWS is, where to look and what to look for a lot more quickly than I might have a year or two ago. 
	ii.	A few of the problems that I ran into initially where being overwhelmed with the information and thinking too far into it. That doesn’t mean I won’t have mistakes or need to learn more information as I go and try to get the program to work properly. I don’t have a mentor so asking questions gets a little more difficult, I haven’t had a lot of experience with handling errors either. Diving more deeply into error handling as to understand the issues that arise. I do have couple of friends that I can reach out to and Luckily my partner is well versed in python working through error handling has been easier for in that regard as I’ve done some in python outside of this project. I did also find the Rubber Duck debugging method, although I don’t have a duck I have a whiteboard I’ve been using and it’s helped quite a bit to talk out loud while I’m working through the problems. 
	iii.	I started the project by implementing the call flow and getting the AWS Connect set up and working first. I made an attempt at scraping a website with a python code that was built and modified to output a JSON dictionary that can be used as the dictionary for the vanity numbers. Practicing some error handling in this as I went to properly write the code with notes.  Laying out the sections for the Lambda function was the next portion Keypad-> Scoring -> Generate all possible numbers -> Select best numbers -> Lambda handler. Attempting to add in some error handling and making sure that it works properly or at all 
II.	What shortcuts did you take that would be a bad practice in production? 

III. What would you have done with more time?
