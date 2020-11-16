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

/**
 *
 * 思路：跟方案一一样，引入前缀计数器并在计算过程中，动态修改前缀树
 * 这种做法能进一步对递归树进行剪枝，并且节省记录结果的集合空间（之前引入Set来保证集合不重复）
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords_TrieDFS_Dynamic = function () {
  if (!board || !words || board.length === 0 || words.length === 0) return [];
    const Trie = function () {
        this.children = new Map();
        this.isEnd = false;
        this.wordCount = 0;
        this.insert = function (word) {
            let cur = this;
            for (let i = 0; i < word.length; i++) {
                cur.wordCount++;
                if (!cur.children.has(word[i])) {
                    cur.children.set(word[i], new Trie());
                }
                cur = cur.children.get(word[i]);
            }
            cur.isEnd = true;
            cur.wordCount++;
        };
        // 前缀树加入软删除操作，对相应的前缀节点的wordCount减一
        this.delete = function (prefix) {
            if (this.wordCount) {
                const p = prefix[0];
                const next = this.children.get(p);
                if (prefix.length > 1) {
                    next.delete(prefix.substr(1));
                } else {
                    next.isEnd = false;
                    next.wordCount--;
                }
                this.wordCount--;
            }
        };
    }
    const t = new Trie();
    // 初始化Trie并记录最长单词长度（max）
    words.forEach(w => { t.insert(w); });
    // 初始化方向向量
    const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    const result = [];
    const rows = board.length;
    const cols = board[rows - 1].length;
    /**
     *
     * @param {number} i
     * @param {number} j
     * @param {Set} visited
     * @param {Trie} prev
     * @param {string} prefix
     */
    const dfs = function (i, j, visited, prev, prefix) {
        const curT = prev.children.get(board[i][j]);
        const k = i * cols + j;
        if (!curT || visited.has(k) || curT.wordCount === 0) return;
        else {
            visited.add(k);
            prefix += board[i][j];
            if (curT.isEnd) {
                result.push(prefix);
                // 从前缀树中软删除已经找到了的单词
                t.delete(prefix);
            }
            if (curT.wordCount > 0) {
                directions.forEach(d => {
                    const nR = i + d[0], nC = j + d[1], nK = nR * cols + nC;
                    if (0 <= nR && nR < rows && 0 <= nC && nC < cols && !visited.has(nK)) {
                        dfs(nR, nC, visited, curT, prefix);
                        visited.delete(nK);
                    }
                });
            }
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const visited = new Set();
            dfs(i, j, visited, t, '');
            if (t.wordCount === 0) {
                return result;
            }
        }
    }
    return result;
}
