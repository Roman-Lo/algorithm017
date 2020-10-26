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

### 思考题

#### Q. 使用二分查找，寻找一个半有序数组 [4, 5, 6, 7, 0, 1, 2] 中间无序的地方

```javascript
/**
 * 思考：有序数组分两种序，升或降，因此需要先确认数组的升降序
 * (这里有一个前提，就是数组内不存在相同元素)
 * 我们可以通过前三个元素的大小比对可以确定这个半有序数组的排序类型：
 * * 如果三个元素递增，则比对方式用Math.max
 * * 如果三个元素递减，则比对方式用Math.min
 * * 如果三个元素乱序，说明已经找到目标，这时候前三个元素对于升降序两种排列有四种无序的情况：
 * 1. [Max, Min, Min+1] (升序)
 * 2. [Max-1, Max, Min] (升序)
 * 3. [Min+1, Min, Max] (降序)
 * 4. [Min, Max, Max-1] (降序)
 * 总结可得，无序的地方规律为：
 * 1. [Max, Min] (升序)
 * 2. [Min, Max] (降序)
 * 因此通过二分查找，当通过分别比对中点与相邻点以及边界点的大小，可以确定：
 * 如果[left, mid-1, mid]符合比对单调性，则对 mid+1 -> right 进行二分；
 * 反之对 left -> mid-1 进行二分；
 * 终止条件是：left,right重叠 或 [mid, mid+1] 不符合当前单调性
 * @param {number[]} arr
 */
var findUnordered = function (arr) {
  if (arr.length < 3) return []; // 不可能无序
  let comparer = null;
  if (arr[0] >= arr[1] && arr[1] >= arr[2]) { // 降序
    comparer = Math.min;
  } else if (arr[0] <= arr[1] && arr[1] <= arr[2]) { // 升序
    comparer = Math.max;
  } else { // 找到目标区间
    let maxIdx = 0;
    let minIdx = 0;
    for (let i = 0; i < 3; i++) {
      if (Math.max(arr[i], arr[maxIdx]) === arr[i]) {
        maxIdx = i;
      }
      if (Math.min(arr[i], arr[minIdx]) === arr[i]) {
        minIdx = i;
      }
    }
    if (minIdx < maxIdx) { // 降序
      return arr.slice(minIdx, maxIdx + 1);
    } else { // 升序
      return arr.slice(maxIdx, minIdx + 1);
    }
  }
  // 确定单调性后进行二分搜索，
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1; // 等价于 Math.floor((left + right) / 2);
    if (comparer(arr[mid], arr[mid + 1]) === arr[mid]) {
      // 找到目标
      return arr.slice(mid, mid + 2);
    }
    if (comparer(arr[left], arr[mid]) === arr[mid] && comparer(arr[mid - 1], arr[mid]) === arr[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return [];
}

// test cases
console.log(1, findUnordered([1, 2, 3, 4, 7, 0])); // [7,0]
console.log(2, findUnordered([0, 1, 2, 3, 4, 5])); // [] 有序，返回空
console.log(3, findUnordered([9, 0, 1, 2, 3, 4])); // [9,0]
console.log(4, findUnordered([8, 9, 1, 2, 3, 4])); // [9,1]
console.log(5, findUnordered([8, 9, 10, 11, 3, 4])); // [11,3]
console.log(6, findUnordered([9, 8, 7, 6, 5, 4, 3, 2, 1])); // [] 有序，返回空
console.log(7, findUnordered([6, 5, 4, 3, 2, 1, 9, 8, 7])); // [1,9]
```

### 其它

[assign-cookies.js](./assign-cookies.js)

[best-time-to-buy-and-sell-stock-ii.js](./best-time-to-buy-and-sell-stock-ii.js)

[lemonade-change.js](./lemonade-change.js)

[number-of-islands.js](./number-of-islands.js)

[walking-robot-simulation.js](./walking-robot-simulation.js)

[word-ladder.js](./word-ladder.js)
