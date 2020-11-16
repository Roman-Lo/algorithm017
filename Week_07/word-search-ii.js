/**
 *
 * [212] 单词搜索 II
 *
 * https://leetcode-cn.com/problems/word-search-ii/description/
 *
 * 思路：构建Trie，对于每一个位置分别向四个方向进行DFS。
 * 剪枝操作：
 * 1. DFS深度大于单词组最长单词长度时；
 * 2. 剩余单词量为0时（终止并返回结果）
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords_TrieDFS = function (board, words) {
  if (!board || !words || board.length === 0 || words.length === 0) return [];
  const aCode = 'a'.charCodeAt();
  const Trie = function () {
    this.children = [];
    this.isEnd = false;
    this.insert = function (word) {
      let cur = this;
      for (let i = 0; i < word.length; i++) {
        const c = word[i].charCodeAt() - aCode;
        if (!cur.children[c]) {
          cur.children[c] = new Trie();
        }
        cur = cur.children[c];
      }
      cur.isEnd = true;
    };
  }
  const t = new Trie();
  let max = 0, wordCnt = words.length;
  // 初始化Trie并记录最长单词长度（max）
  words.forEach(w => { t.insert(w); max = Math.max(max, w.length); });
  // 初始化方向向量
  const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]];
  // 已记录的单词集合
  const saved = new Set();
  const result = [];
  const rows = board.length;
  const cols = board[rows - 1].length;
  const dfs = function (i, j, visited, prev, prefix) {
    const curT = prev.children[board[i][j].charCodeAt() - aCode];
    const k = i * cols + j;
    if (!curT || visited.has(k) || prefix.length === max || !wordCnt) return;
    else {
      visited.add(k);
      prefix += board[i][j];
      if (curT.isEnd && !saved.has(prefix)) {
        result.push(prefix);
        saved.add(prefix);
        wordCnt--;
      }
      directions.forEach(d => {
        const nR = i + d[0], nC = j + d[1], nK = nR * cols + nC;
        if (0 <= nR && nR < rows && 0 <= nC && nC < cols && !visited.has(nK)) {
          dfs(nR, nC, visited, curT, prefix);
          visited.delete(nK);
        }
      });
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const visited = new Set();
      dfs(i, j, visited, t, '');
      if (wordCnt === 0) return result;
    }
  }
  return result;
}
