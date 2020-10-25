/**
 * [874] 模拟行走机器人
 * https://leetcode-cn.com/problems/walking-robot-simulation/description/
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  return robotSim_Loop(commands, obstacles);
};

/**
 * 思路：模拟机器人走路，但是在走之前，先用雷达勘测最大可抵达的终点
 * 具体见代码注释
 * 我的题解：https://leetcode-cn.com/problems/walking-robot-simulation/solution/yi-dong-ji-qi-ren-zhi-chao-yuan-lei-da-ban-by-roma/
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim_Loop = function (commands, obstacles) {
  // 构建障碍缓存，根据移动特性，我们根据x,y轴值分别进行缓存
  const obsCacheByX = new Map(); // x轴方向上的障碍坐标
  const obsCacheByY = new Map(); // y轴方向上的障碍坐标
  obstacles.forEach(o => {
    obsCacheByX.has(o[0]) ? obsCacheByX.get(o[0]).push(o[1]) : obsCacheByX.set(o[0], [o[1]]);
    obsCacheByY.has(o[1]) ? obsCacheByY.get(o[1]).push(o[0]) : obsCacheByY.set(o[1], [o[0]]);
  });
  const obsCaches = [obsCacheByX, obsCacheByY];

  // 移动方向集合分别代表上，右，下，左，其中[a,b]，a是移动轴坐标索引，b是移动方向
  const heads = [[1, 1], [0, 1], [1, -1], [0, -1]]; // n, e, s, w; [x|y, +|-]
  const coord = [0, 0, 0]; // x, y, head，坐标信息，包括x, y，以及当前移动方向索引
  let max = 0;
  let right = 0; // 记录向右转的次数，负数代表向左转
  // 移动函数
  const go = function (c) {
    if (right !== 0) { // 移动之前，检测是否需要转向
      // 设置方向索引
      // 因为每一次向右转其实就是当前索引+1，超过之后就%4，因为原地转4次就是复位
      // 而一次向左转可以理解成向右转三次，结合一起有：
      coord[2] = (coord[2] + (right < 0 ? 3 * -right : right)) % 4;
      // 执行转向后，将转向指令清零
      right = 0;
    }
    // 获取当前方向设定
    const head = heads[coord[2]];
    // 移动轴索引
    const moveAxis = head[0];
    // 固定轴索引，因为每次只会朝单一方向移动，因此不是x轴就是y轴，因此：
    const standAxis = (moveAxis + 1) % 2;
    // 计算无障碍时的预期终点
    let end = coord[moveAxis] + c * head[1];
    // 从缓存中找出当前移动方向轴上的障碍坐标
    const obVals = obsCaches[standAxis].get(coord[standAxis]) || [];
    // 碰撞可能性检测
    //  有效障碍需要满足介于end与当前出发点之前，这里有两种情况:
    //           end <---- o ----- coord ---- o ------> end
    //  head[1]            -1        |        +1
    //  可以归纳出：
    //  (head[1] === 1 && coord[moveAxis] < o && end >= o) ||
    //  (head[1] === -1 && coord[moveAxis] > o && end <= o)
    //  约简为：
    //  const detector = head[1] === 1 ? Math.max : Math.min;
    //  const coordRef = coord[moveAxis] + head[1]; // 这里是为了让detector能区分非等情况
    //  detector(coordRef, o) === o && detector(o, end) === end
    const detector = head[1] === 1 ? Math.max : Math.min;
    const coordRef = coord[moveAxis] + head[1];
    obVals.forEach(o => {
      if (detector(coordRef, o) === o && detector(o, end) === end) {
        // 满足条件时，将当前终点坐标设置在障碍之前
        end = o - head[1];
      }
    });
    // 设置坐标终点
    coord[moveAxis] = end;
    // 求当前坐标距离原点(0,0)欧式距离的平方，并与之前的值比较，取其最大值
    max = Math.max(max, coord[0] * coord[0] + coord[1] * coord[1]);
  }
  commands.forEach(c => {
    if (c >= 0) {
      // 接收到步长时，开始移动机器人
      go(c);
    } else {
      // 转向可以先记录（有时候若干相邻的转向指令可以相互抵消）
      right += (c === -1 ? 1 : -1);
    }
  });
  return max;
}
