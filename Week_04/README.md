# 学习笔记

## 内容要点

### 深度优先搜索（DFS）

深度优先搜索，就是基于栈(Stack)的结构，从树的单边渗透直到底部。通常，如果是图的话，因为存在环，所以需要记录已访问的节点，避免重复遍历而造成死循环。

代码模板：

1. 递归

``` javascript
const visited = Set();
var dfs = function(head, target) {
    if (visited.has(head)) return false;
    if (head === target) return true;
    visited.add(head);
    else {
      for (const child of head.children || []) {
        if (dfs(child, target)) {
          return true;
        }
      }
      return false;
    }
}
```

1. 栈循环

``` javascript
var dfs = function(head, target) {
  const stack = [head];
  const visited = new Set([head]);
  while(stack.length) {
    const top = stack.pop();
    if (top === target) {
      return true;
    }
    for (let i = (top.children || []).length - 1; i >= 0; i++) {
      const child = top.children[i];
      if (!visited.has(child)) {
        visited.add(child);
        stack.push(child);
      }
    }
  }
  return false;
}
```

### 广度优先搜索（BFS）

广度优先搜索，是按层遍历树的每层节点。根据这种特性，BFS通常利用队列(Queue)这种数据结构进行遍历。

与DFS类似，如果对图进行BFS操作时，需要维护已访问节点。

``` javascript
var bfs = function(start, end) {
  const visited = new Set([start]);
  const q = [start]; // 队列
  const results = [];
  while (q.length) {
    const nodes = q.splice(0, q.length);
    const level = [];
    for (let child of nodes) {
      if (!visited.has(child)) {
        visited.add(child);
        level.push(child);
        if (child === end) {
          break;
        }
      }
    }
    results.push(level);
  }
  return results;
}
```

### 二分搜索

大前提: __搜索对象是一个有序的集合__

二分搜索执行过程中，会遇到奇偶问题：

* 当搜索范围元素集合为偶数时：取左边值作为中值

代码模板：

``` javascript
var binarySearch = function(sortedArr, target) {
    let left = 0,
        right = sortedArr.length;
    while (left <= right) {
        const mid = (left + right) >> 1; // 位运算，相当于 `Math.floor((left + right) / 2)`
        if (sortedArr[mid] === target) {
            return mid;
        } else if (sortedArr[mid] < target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
}
```

### 贪心算法

大前提：__能知道当前最优解，且最优解集合能最终得到符合条件的解__

其实就是在选择分支时，永远选取其中最优的，如此类推。

## 作业部分

[assign-cookies.js](./assign-cookies.js)

[best-time-to-buy-and-sell-stock-ii.js](./best-time-to-buy-and-sell-stock-ii.js)

[lemonade-change.js](./lemonade-change.js)

[number-of-islands.js](./number-of-islands.js)

[walking-robot-simulation.js](./walking-robot-simulation.js)

[word-ladder.js](./word-ladder.js)
