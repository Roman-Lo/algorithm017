/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  return generateParenthesis_Loop(n);
};

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis_Recursive = function (n) {
  if (n === 0) return [];
  const results = [];
  const generate = function (left, right, s) {
    if (left === n && right === n) { // 左括号与右括号都填满时，加入结果集
      results.push(s);
      return;
    }
    if (left < n) { // 左括号未满，加入左括号
      generate(left + 1, right, `${s}(`);
    }
    if (right < left) { // 右括号缺失，加入右括号
      generate(left, right + 1, `${s})`);
    }
  }

  generate(0, 0, "");

  return results;
};
