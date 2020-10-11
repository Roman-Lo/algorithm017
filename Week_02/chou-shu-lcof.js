// import { BinaryHeap } from './common/heap';
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function (n) {
    //return nthUglyNumber_235(n);
    return nthUglyNumber_Factors(n, [2, 3, 5]);
};

//#region nthUglyNumber_235
var nthUglyNumber_235 = function (n) {
    const arr = [1];
    let p2 = 0, p3 = 0, p5 = 0;
    let i = arr.length - 1;
    while (i < n) {
        const r2 = arr[p2] * 2, r3 = arr[p3] * 3, r5 = arr[p5] * 5;
        i = arr.push(Math.min(r2, r3, r5)) - 1;
        if (arr[i] === r2) { p2++; }
        if (arr[i] === r3) { p3++; }
        if (arr[i] === r5) { p5++; }
    }
    return arr[n - 1];
}
//#endregion

//#region nthUglyNumber_Factors
var nthUglyNumber_Factors = function (n, factors) {
    const arr = [1];
    let pointers = factors.map(x => 0);
    let i = arr.length - 1;
    while (i < n) {
        const result = pointers.map((x, idx) => arr[x] * factors[idx]);
        i = arr.push(Math.min(...result)) - 1;
        result.forEach((r, idx) => {
            if (r === arr[i]) {
                pointers[idx]++;
            }
        })
    }
    return arr[n - 1];
}
//#endregion

//#region nthUglyNumber_heap
// 尚未实现
// var nthUglyNumber_heap = function (n) {
//     const heap = new BinaryHeap('min');
//     const set = new Set([2, 3, 5]);
//     heap.insert(2, 3, 5);
//     let target = 1;
//     for (let i = 1; i < n; i++) {
//         target = heap.delete(0);
//         const a = target * 2, b = target * 3, c = target * 5;
//         if (!set.has(a)) { heap.insert(a); set.add(a); };
//         if (!set.has(b)) { heap.insert(b); set.add(b); };
//         if (!set.has(c)) { heap.insert(c); set.add(c); };
//     }
//     return target;
// }
//#endregion
