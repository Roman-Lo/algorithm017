/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const result = [];
    const map = new Map();
    for (let i = 0; i < strs.length; i++) {
       const key = buildMapKey(strs[i]);
       if (map.has(key)) {
           result[map.get(key)].push(strs[i]);
       } else {
           map.set(key, result.push([strs[i]]) - 1);
       }
    }
    return result;
};