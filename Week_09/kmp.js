/**
 *
 * @param {string} text
 * @param {string} pattern
 * @returns {number[]}
 */
var kmp = function (text, pattern) {
  if (!text || !pattern || text.length === 0 || pattern.length === 0) return [];
  const prefixArr = prefixTable(pattern);
  const matches = [];
  let j = 0, i = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      if (j === pattern.length - 1) {
        matches.push(i);
        j = prefixArr[j];
        if (j < 0) {
          j++;
          i++;
        }
      } else {
        j++;
        i++;
      }
    } else {
      j = prefixArr[j];
      if (j < 0) {
        j++;
        i++;
      }
    }
  }
  return matches;
}

/**
 *
 * @param {string} pattern
 */
var prefixTable = function (pattern) {
  if (pattern.length === 1) return [-1];
  const dp = [-1, 0];
  for (let i = 1; i < pattern.length - 1; i++) {
    dp[i + 1] = pattern[dp[i]] === pattern[i] ? dp[i] + 1 : 0;
  }
  return dp;
}

console.log(kmp('aabcaaaba', 'aba'));
