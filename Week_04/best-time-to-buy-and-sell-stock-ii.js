/**
 *
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {

};


/**
 * 思路：如果当天价格比昨天大，那么就应该昨天买入今天卖出，赚取两天差价，如此类推
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit_Loop = function (prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i-1]) {
      profit += prices[i] - prices[i-1];
    }
  }
  return profit;
}

/**
 * 这个是题意外的思考，因为股票真实交易里是有手续费的（排除分红和配股等额外因素），
 * 那么现实中应该是抄底买入，并且持有到最高位抛出，减少买卖次数来降低手续成本。因此：
 * 思路：如果当天价格比昨天大，那么理应继续持有（或昨天买入）；如果当天价格比昨天低，且目前已经持有股票，那么理应昨天卖出；
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit_LoopV2 = function (prices) {
  let profit = 0;
  let buy = -1;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) { // 有盈利时，应该昨日买日或者继续持有。
      buy = buy === -1 ? i - 1 : buy;
    } else if (buy !== -1) { // 跌价时，昨日应该抛出
      profit += prices[i - 1] - prices[buy];
      buy = -1; // 持有位置为-1
    }
  }
  if (buy !== -1) { // 如果手中有持股，那么最后一天无论如何都要抛出
    profit += prices[prices.length - 1] - prices[buy];
  }
  return profit;
}
