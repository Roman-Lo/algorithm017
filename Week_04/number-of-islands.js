/**
 * [200] 岛屿数量
 * https://leetcode-cn.com/problems/number-of-islands/description/
 *
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  if (!grid || grid.length === 0) return 0;
  const row = grid.length - 1;
  const col = grid[0].length - 1;
  const visited = new Set();
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  /**
   * 有效边界检查
   * @param {number} r 行
   * @param {number} c 列
   * @returns
   */
  const boundaryCheck = function (r, c) {
    return 0 <= r && r <= row && 0 <= c && c <= col;
  }
  /**
   * 基于DFS的相邻陆地搜索
   * @param {number} rowIdx
   * @param {number} colIdx
   * @param {string[][]} map
   * @returns {boolean}
   */
  const checkLand_DFS = function (rowIdx, colIdx, map) {
    if (!boundaryCheck(rowIdx, colIdx)) return true;
    const key = `${rowIdx},${colIdx}`;
    if (visited.has(key)) return false;
    visited.add(key);
    if (map[rowIdx][colIdx] === '1') {
      checkLand(rowIdx + 1, colIdx, map);
      checkLand(rowIdx - 1, colIdx, map);
      checkLand(rowIdx, colIdx + 1, map);
      checkLand(rowIdx, colIdx - 1, map);
      return true;
    }
    return false;
  }

  /**
   * 基于BFS的相邻陆地搜索
   * @param {number} rowIdx
   * @param {number} colIdx
   * @param {string[][]} map
   * @returns {boolean}
   */
  const checkLand_BFS = function (rowIdx, colIdx, map) {
    const key = `${rowIdx},${colIdx}`;
    if (visited.has(key) || map[rowIdx][colIdx] === '0') return false;
    visited.add(key);
    const q = [[rowIdx, colIdx]];
    while (q.length) {
      const children = q.splice(0, q.length);
      children.forEach(child => {
        const r = child[0], c = child[1];
        directions.forEach(d => {
          const tr = r + d[0], tc = c + d[1];
          if (boundaryCheck(tr, tc)) {
            const k = `${tr},${tc}`;
            if (!visited.has(k) && map[tr][tc] === '1') {
              q.push([tr, tc]);
              visited.add(k);
            }
          }
        });
      });
    }
    return true;
  }

  let cnt = 0;
  for (let i = 0; i <= row; i++) {
    for (let j = 0; j <= col; j++) {
      if (checkLand_BFS(i, j, grid)) {
        cnt++;
      }
    }
  }
  return cnt;
};
