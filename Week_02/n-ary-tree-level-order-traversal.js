/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    // return levelOrder_Recursive(root);
    // return levelOrder_RecursiveByLevel(root);
    // return levelOrder_LoopQueue(root);
    return levelOrder_Loop(root);
};

//#region levelOrder_Recursive
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder_Recursive = function (root) {
    if (!root) return [];
    return levelOrder_Recursive_Core([root], []);
}

/**
 * @param {Node[]} children
 * @param {number[][]} result
 * @return {number[][]}
 */
var levelOrder_Recursive_Core = function (children, result) {
    const nextLevels = [];
    const current = [];
    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        current.push(node.val);
        if (node.children) {
            nextLevels.push(...node.children);
        }
    }
    result.push(current);
    if (nextLevels.length > 0) {
        return levelOrder_Recursive_Core(nextLevels, result);
    }
    return result;
}
//#endregion

//#region levelOrder_RecursiveByLevel
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder_RecursiveByLevel = function (root) {
    if (!root) return [];
    return levelOrder_RecursiveByLevel_Core(root, 0, []);
}


/**
 * @param {Node} node
 * @param {number} level
 * @param {number[][]} result
 * @return {number[][]}
 */
var levelOrder_RecursiveByLevel_Core = function (node, level, result) {
    if (result.length <= level) {
        result.push([]);
    }
    result[level].push(node.val);
    if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            levelOrder_RecursiveByLevel_Core(node.children[i], level + 1, result);
        }
    }
    return result;
}
//#endregion

//#region levelOrder_Loop
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder_Loop = function (root) {
    if (!root) return [];
    const result = [];
    let curLevelNodes = [root];
    while (curLevelNodes.length > 0) {
        const nextLevelNodes = [];
        const idx = result.push([]) - 1;
        for (let i = 0; i < curLevelNodes.length; i++) {
            const node = curLevelNodes[i];
            result[idx].push(node.val);
            if (node.children) {
                nextLevelNodes.push(...node.children);
            }
        }
        curLevelNodes = nextLevelNodes;
    }
    return result;
}
//#endregion

//#region levelOrder_LoopQueue
var levelOrder_LoopQueue = function (root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    let lvl = 0;
    while (queue.length > 0) {
        lvl = result.push([]) - 1;
        const qSize = queue.length;
        for (let i = 0; i < qSize; i++) {
            const node = queue.shift(); // dequeue
            result[lvl].push(node.val);
            if (node.children && node.children.length > 0) {
                queue.push(...node.children); // enqueue next level nodes
            }
        }
    }
    return result;
}

//#endregion


/**
 * @param {number} val
 * @param {Node[]} children
 */
function Node(val, children) {
    this.val = val;
    this.children = children;
}