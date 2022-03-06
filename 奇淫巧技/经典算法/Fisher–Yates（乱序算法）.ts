// Fisher–Yates shuffle 洗牌算法

function shuffle<T = any>(arr: Array<T>) {
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[index], arr[m]] = [arr[m], arr[index]];
  }
  return arr;
}
