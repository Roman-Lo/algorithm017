/**
 * https://leetcode-cn.com/problems/lemonade-change/description/
 *
 * 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。
 *
 * 顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
 *
 * 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。
 * 你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
 *
 * 注意，一开始你手头没有任何零钱。
 *
 * 如果你能给每位顾客正确找零，返回 true ，否则返回 false 。
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {

};

/**
 * 思路：根据题意，纸币面值只有5,10,20三种，因此收了的20块永远是不会用于找零的，
 * 因此，我们维护钱包里钱的张数只需要关注面值为5和10的即可；同时，需要找零的情况只有
 * 拿到10或者20面值的时候，问题就变成：用钱包里的钱拼凑5或者15的情况。
 * @param {number[]} bills
 * @return {boolean}
 * @param {*} bills
 */
var lemonadeChange_Loop = function (bills) {
  let five = 0, ten = 0; // 初始化钱包
  for (let i = 0; i < bills.length; i++) {
    // 1. 拿到5块直接收
    if (bills[i] === 5) { five++; }
    // 2. 拿到10块凑5块，并且记入账10块
    else if (bills[i] === 10) { five--, ten++; }
    // 3. 拿到20块时，如果钱包有十块，先用10块+5块
    else if (ten > 0) { five--, ten--; }
    // 4. 拿到20块时，钱包没10块，那么用3张5块
    else { five -= 3; }
    // 检查钱包当前状态（因为前面使用10块时已经做过判定，所以这里只需要判定5块的张数是否合法即可）
    if (five < 0) return false;
  }
  return true;
}


/**
 * 思路：跟上面思路一样，这里用一个更加公用的方法去解决，可以自定义币种面值集合以及商品单价
 * @param {number[]} bills
 * @return {boolean}
 * @param {*} bills
 */
var lemonadeChange_LoopV2 = function (bills) {
  const itemValue = 5; // 商品单价
  const faces = [5, 10, 20]; // 面值集合
  const purse = [0, 0]; // 初始化钱包（索引对应面值）
  for (let i = 0; i < bills.length; i++) {
    const b = bills[i];
    let idx = faces.indexOf(b); // 找到对应的索引
    if (idx === 0) { purse[0]++; } // 最小面值直接收，不需要找零
    else {
      let change = b - itemValue;
      let founded = false;
      let purseIdx = idx;
      // 从次大面值钱包开始算
      while (purseIdx--) {
        // 如果当前面值数量无效 或者 找零数量小于当前面值时，直接移到下一个面值位
        if (purse[purseIdx] < 0 || faces[purseIdx] > change) continue;
        let remain = change;
        let start = purseIdx;
        let used = [];
        while (start >= 0 && remain > 0) { // 逐步往前贪心（用完10再用5...如此类推）
          const usedCnt = used[start] || 0;
          if (purse[start] > usedCnt && remain >= faces[start]) { // 判定当前钱包有可用的钱
            remain -= faces[start];
            used[start] = usedCnt + 1; // 记录当前使用情况
          } else {
            start--; // 钱包钱用完，用次小面值继续尝试
          }
        }
        if (remain === 0) { // 如果成功找零，标记成功，并且更新钱包状态
          founded = true;
          used.forEach((u, j) => purse[j] -= u);
          break;
        }
      }
      if (!founded) {
        return false;
      }
      else if (b < faces[faces.length - 1]) purse[idx]++; // 把收到的钱收好
    }
  }
  return true;
}
