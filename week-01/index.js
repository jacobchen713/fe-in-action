/**
 * @description 10进制浮点数转换成 64 进制
 * 10进制浮点数 分成两部分 整数部分和小数部分分别转换为64进制 最后一位表示小数点位数
 * @param {Number} num 10进制浮点
 * @returns String
 */
const encodeTo64 = (num) => {
  const numString = Number(num).toString();

  const numArry = numString.split('.');
  // 整数部分
  const numInt = Number(numArry[0]);
  // 小数部分字符串
  const numFloatString = numArry.length === 2 ? numArry[1] : '';

  const intPart64 = to64(numInt);
  const floatPart64 = numFloatString ? to64(Number(numFloatString)) : '';

  return `${intPart64}${floatPart64 ? floatPart64 : ''}${numFloatString.length}`
}

/**
 * @description 转换为64进制
 * @param {Number} num 整数
 * @returns String
 */
const to64 = (num) => {
  const elements = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ=/';

  let result = [];
  let div = num;
  while (div > 63) {
    result.push(elements[div % 64]);
    div = Math.floor(div / 64);
  }
  result.push(elements[div]);
  return result.reverse().join("");
}

