const assert = require('assert');
const { getRandomChar } = require('./index.js'); // Adjust the path if needed


describe('getRandomChar', () => {
    it('should return vowels', () => {
      const input = 'aeiou';
      const result = getRandomChar(input);
      assert.ok(input.includes(result));
    });
  
    it('should return a character from the input array', () => {
      const input = ['a', 'b', 'c', 'd', 'e', 'f'];
      const result = getRandomChar(input.join(''));
      assert.ok(input.includes(result));
    });
  
    it('should handle empty input gracefully', () => {
      const input = '';
      const result = getRandomChar(input);
      assert.strictEqual(result, undefined);
    });
  
    it('should handle single character input', () => {
      const input = 'a';
      const result = getRandomChar(input);
      assert.strictEqual(result, 'a');
    });
  
  });