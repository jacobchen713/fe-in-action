/**
 * @description 10进制浮点数转换成 64 进制
 * 10进制浮点数 分成两部分 整数部分和小数部分分别转换为64进制 
 * 最后一位表示小数部分位数
 * 倒数第二位表示小数部分位转换为64进制后的位数
 * 12.0061 -> cZ14
 * 12 -> c
 * 0061 -> 61 -> Z
 * 1 小数部分转换为64进制后的位数
 * 4 10进制浮点数小数部分4位(即“0061”的长度)
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

  console.log('numInt', numInt);
  console.log('numFloatString', numFloatString);
  console.log('intPart64', intPart64);
  console.log('floatPart64', floatPart64);

  return `${intPart64}${floatPart64}${to64(floatPart64.length)}${to64(numFloatString.length)}`;
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

/**
 * 转换为10进制
 * @param {String} str 
 * @returns Number
 */
const decodeTo10 = (str) => {
  // 小数部分长度
  const floatPartLen = getNum(str.slice(-1));
  // 64进制小数部分长度
  const floatPart64Len = getNum(str.slice(-2, -1));
  // 64进制小数部分
  const floatPart64 = str.slice(-2 - floatPart64Len, -2);
  // 64进制整数数部分
  const intPart64 = str.slice(0, -2 - floatPart64Len);
  const intPart64Len = intPart64.length;

  console.log(intPart64, floatPart64)

  let intPart10 = 0;
  let floatPart10 = 0;

  for (let i = 0; i < intPart64Len; i++) {
    intPart10 += getNum(intPart64[i]) * Math.pow(64, intPart64Len - 1 -i);
  }

  for (let i = 0; i < floatPart64Len; i++) {
    floatPart10 += getNum(floatPart64[i]) * Math.pow(64, floatPart64Len - 1 -i);
  }

  return intPart10 + floatPart10 / Math.pow(10, floatPartLen);
}

/**
 * 获取64进制中各元素代表的10进制值
 * 例如：
 * 0 -> 0
 * a -> 10
 * A -> 36
 * = -> 62
 * / -> 63
 * @param {String} char 
 */
const getNum = (char) => {
  const codePoint = char.codePointAt();

  // 0 - 9
  if (codePoint >= '0'.codePointAt() && codePoint <= '9'.codePointAt()) {
    return codePoint - '0'.codePointAt();
  }

  // a - z
  if (codePoint >= 'a'.codePointAt() && codePoint <= 'z'.codePointAt()) {
    return codePoint - 'a'.codePointAt() + 10
  }

  // A - Z
  if (codePoint >= 'A'.codePointAt() && codePoint <= 'Z'.codePointAt()) {
    return codePoint - 'A'.codePointAt() + 36
  }

  if (char === '=') {
    return 62;
  }

  if (char === '/') {
    return 63;
  }
}
