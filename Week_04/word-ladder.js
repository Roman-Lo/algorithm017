/**
 *
 * [127] 单词接龙
 * https://leetcode-cn.com/problems/word-ladder/description/
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {

};


/**
 * 思路：因为单词每次转换只能变动其中一个字母，因此，我们可以得到以下一棵变换树
 *
 *       ?ot - ...                   hat ...
 *     /                           /
 * hot - h?t ["hat", "hot", "hut"] - hut ...
 *     \                           \
 *       ho? - ...                   hot
 *                                   (与之前重复)
 * 在树里面我们可以得出：
 * 1. 单词转换可以通过中间态作为索引进行查找，可能有条路径可以满足转换结果，因此这是一个图的结构
 * 2. 题目要求选择最短的路径，因此问题可以抽象成选择图中任意两个点，计算其最短路径，选择用BFS进行解题
 * 3. 为了提速，我们可以预先生成单词(word)跟中间态(state)的相互映射关系(word <==> states)
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength_BFS = function (beginWord, endWord, wordList) {
  const word2States = new Map(); // key: 单词, value: 可用中间态
  const state2Words = new Map(); // key: 中间态, value: 对应的单词
  /**
   * 单词中间态构造器
   * @param {string} w
   * @returns {string[]}
   */
  const buildStates = function (w) {
    const list = [];
    for (let i = 0; i < w.length; i++) {
      const state = w.substr(0, i) + '?' + w.substr(i + 1); // 构造中间态，如：hot => ['?ot', 'h?t', 'ho?'];
      list.push(state);
    }
    return list;
  }
  wordList.forEach(w => {
    const states = buildStates(w);
    states.forEach(s => {
      const l = state2Words.get(s);
      if (l) { l.push(w) }
      else { state2Words.set(s, [w]); }
    });
    word2States.set(w, states);
  });
  // 因为起始的单词不在单词表里，因此要在单词到转换态映射中加入起始单词的转换态
  const beginWordStates = buildStates(beginWord);
  word2States.set(beginWord, beginWordStates);

  const q = [beginWord]; // bfs用队列进行遍历，首元素为起始节点
  const pushed = new Set(); // 记录已经进入过队列的节点
  let level = 0; // 遍历层数
  while (q.length) {
    level++;
    const children = q.splice(0, q.length); // 取出该遍历层的所有子节点
    for (const word of children) {
      const states = word2States.get(word); // 获取当前单词的所有中间态
      if (states) {
        word2States.delete(word); // 从集合里移除已经访问的节点
        for (const state of states) {
          // 获取中间态对应的单词
          const words = state2Words.get(state);
          for (const transformed of words || []) {
            if (transformed === endWord) { // 找到目标，结束
              return level + 1;
            } else if (!pushed.has(transformed)) {
              // 如果节点未被访问过，那么加到下一层的遍历中
              q.push(transformed);
              pushed.add(transformed);
            }
          }
        }
      }
    }
  }
  return 0; // 全部节点遍历完，没找到符合条件的路径
};

/**
 * 思路：根据上面的BFS思路，我们每一层的节点数是相对低程递增状态，
 * 而对于每一个节点n，它潜在的出度和入度都是n.length（即转换态数量）。
 * 因此BFS到后面，所以遍历数是相对收敛的。
 * 根据这个特点，我们分别从beginWord和endWord出发构建BFS，
 * 并且每次都选择可用出度最小的方向进行遍历，即当前队列中存在元素最小的，
 * 直到队列中出现重复元素，这时候两边层数和即为最短路径
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength_BFS_2Direction = function (beginWord, endWord, wordList) {
  const word2States = new Map(); // key: 单词, value: 可用中间态
  const state2Words = new Map(); // key: 中间态, value: 对应的单词
  /**
   * 单词中间态构造器
   * @param {string} w
   * @returns {string[]}
   */
  const buildStates = function (w) {
    const list = [];
    for (let i = 0; i < w.length; i++) {
      const state = w.substr(0, i) + '?' + w.substr(i + 1); // 构造中间态，如：hot => ['?ot', 'h?t', 'ho?'];
      list.push(state);
    }
    return list;
  }
  wordList.forEach(w => {
    const states = buildStates(w);
    states.forEach(s => {
      const l = state2Words.get(s);
      if (l) { l.push(w) }
      else { state2Words.set(s, [w]); }
    });
    word2States.set(w, states);
  });
  // 因为起始的单词不在单词表里，因此要在单词到转换态映射中加入起始单词的转换态
  const beginWordStates = buildStates(beginWord);
  word2States.set(beginWord, beginWordStates);

  // 初始化两个队列和两个队列已访问节点集合
  let beginQ = [beginWord];
  let beginVisited = new Set([beginWord]);
  let endQ = [endWord];
  let endVisited = new Set([endWord]);

  let level = 0; // 遍历层数
  while (beginQ.length && endQ.length) {
    level++;
    if (beginQ.length > endQ.length) { // 最小队列置换，确保beginQ永远是最小的
      let tmp = [beginQ, beginVisited];
      beginQ = endQ;
      beginVisited = endVisited;
      endQ = tmp[0];
      endVisited = tmp[1];
    }
    const children = beginQ.splice(0, beginQ.length); // 取出该遍历层的所有子节点
    for (const word of children) {
      const states = word2States.get(word); // 获取当前单词的所有中间态
      if (states) {
        for (const state of states) {
          // 获取中间态对应的单词
          const words = state2Words.get(state);
          for (const transformed of words || []) {
            if (endVisited.has(transformed)) { // 找到目标，结束
              return level + 1;
            } else if (!beginVisited.has(transformed)) {
              // 如果节点未被访问过，那么加到下一层的遍历中
              beginQ.push(transformed);
              beginVisited.add(transformed);
            }
          }
        }
      }
    }
  }
  return 0;
}
