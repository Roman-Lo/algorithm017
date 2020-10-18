# 学习笔记

## 周记

本周主要学习了递归，以及基于递归的衍生概念分治和回溯。

### 递归

* 其根本是一个循环，但是利用了程序执行栈的特性，来执行的基于栈结构的循环。

* 找最近重复子问题

* 数学归纳法证明

递归的模板

``` js
var recursion = function(lvl, ...args) {
    // terminator
    if (lvl > MAX_LVL) {
      // process result
      return;
    }

    // process logic
    process(lvl, args);

    // drill down
    recursion(lvl + 1, args);

    // reset state
}
```

### 分治

分治，顾名思义，分而治之，就是将其拆分成若干子问题，最后将其合并。

分治的一般模板：

``` js
var divideAndConquer = function(problem, ...params) {
    // terminator
    if (problem === null) {
      // process result
      return;
    }

    // prepare data
    const data = prepare_data(problem);
    const subProblems = divide_problem(problem, data);
    //conquer sub problems (drill down)
    const r1 = divideAndConquer(subProblems[0], params);
    const r2 = divideAndConquer(subProblems[1], params);
    const r3 = divideAndConquer(subProblems[2], params);
    //...

    // process result
    const result = process_result(r1, r2, r3);

    // reset state
}
```

### 回溯

* 分步是错

* 优化时要注意剪枝

* 最坏的情况是指数时间的运算

## 作业部分

[combinations.js](./combinations.js)

[construct-binary-tree-from-preorder-and-inorder-traversal.js](./construct-binary-tree-from-preorder-and-inorder-traversal.js)

[lowest-common-ancestor-of-a-binary-tree.js](./lowest-common-ancestor-of-a-binary-tree.js)

[permutations-ii.js](./permutations-ii.js)

[permutations.js](./permutations.js)
