/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    // return isAnagram_SingleFor(s, t);
    return isAnagram_DoubleFor(s, t);
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram_SingleFor = function (s, t) {
    if (s.length !== t.length) return false;
    const map = new Map();
    for (let i = 0; i < s.length; i++) {
        const c1 = s[i], c2 = t[i];
        if (c1 !== c2) {
            const v1 = (map.get(c1) || 0) + 1;
            if (v1 === 0) {
                map.delete(c1);
            } else {
                map.set(c1, v1);
            }
            const v2 = (map.get(c2) || 0) - 1;
            if (v2 === 0) {
                map.delete(c2);
            } else {
                map.set(c2, v2);
            }
        }
    }
    return map.size === 0;
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram_DoubleFor = function (s, t) {
    if (s.length !== t.length) return false;
    const map = new Map();
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1);
    }
    for (let i = 0; i < t.length; i++) {
        let val = map.get(t[i]) || 0;
        if (val === 0) {
            return false;
        }
        map.set(t[i], val - 1);
    }
    return true;
}