# 学习笔记

## 内容要点

### 字符串的动态规划

1. 对于字符串的对比问题，通常通过不低于二维的矩阵进行推导，维度分别为字符串A和B按字母占位推导（如：编辑距离，子序列等）

### KMP

核心：

* pattern的前缀表计算（动态规划：`dp[i] = pat[dp[i - 1]] === pat[i - 1] ? dp[i - 1] + 1 : 0`）

* 当对应字符不匹配时，通过前缀表来定位接下来pattern与text的对齐位置

``` js
var prefixTable = function(pattern) {
    if (pattern.length === 1) return [-1];
    const dp = [-1, 0];
    for (let i = 1; i < pattern.length - 1; i++) {
        dp[i + 1] = pattern[dp[i]] === pattern[i] ? dp[i] + 1 : 0;
    }
    return dp;
}
```

算法演示：[KMP 字符串匹配算法视频](https://www.bilibili.com/video/av11866460?from=search&seid=17425875345653862171)

代码: [KMP](./kmp.js)

## 习题部分

[[91] 解码方法](decode-ways.js)

### 问答题 

Q. 在学习总结中，写出不同路径 2 这道题目的状态转移方程。

解答：

```js
f(x, y) = obstacleGrid[y][x] === 1 ? 0 : f(x - 1, y) + f(x, y - 1);
```
