const assert = require('assert');
const { getRandomChar } = require('./index.js'); // Adjust the path if needed


describe('getRandomChar', () => { // Test Suite start 
    it('should return vowels', () => { // Test case for vowels
      const input = 'aeiou';
      const result = getRandomChar(input); //
      assert.ok(input.includes(result)); // Evaluates to True or the case fails
    });
  
    it('should return a character from the input array', () => { 
      const input = ['a', 'b', 'c', 'd', 'e', 'f']; // input array
      const result = getRandomChar(input.join('')); // 
      assert.ok(input.includes(result));
    });
  
    it('should handle empty input gracefully', () => { // Test case for empty input
      const input = '';
      const result = getRandomChar(input); // output is random 
      assert.strictEqual(result, undefined);
    });
  
    it('should handle single character input', () => { // Test case for single character input
      const input = 'a'; 
      const result = getRandomChar(input);
      assert.strictEqual(result, 'a'); 
    });
  
  }); 