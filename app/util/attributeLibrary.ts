import { Address } from 'viem';

export function hex2bin(hex: string) {
  return hex
    .replace('0x', '')
    .split('')
    .map((i) => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('');
}
//@ts-ignore
export function leading0s(hash: Address) {
  // @ts-ignore - optional, but we can check if we've already called and return the cached result
  if (leading0s.memo && leading0s.memo[hash]) {
    // @ts-ignore
    return leading0s.memo[hash];
  }
  const binaryData = hex2bin(hash);
  const match = binaryData.match(/^0+(?!$)/);
  const result = match ? match[0].length : 0;

  // @ts-ignore -- save memoization result
  leading0s.memo = leading0s.memo
    ? {
        // @ts-ignore
        ...leading0s.memo,
        hash: result,
      }
    : {
        hash: result,
      };
  return result;
}

export function leading1s(hash: Address) {
  const binaryData = hex2bin(hash);
  const match = binaryData.match(/^1+(?!$)/);
  return match ? match[0].length : 0;
}

export function trailing0s(hash: Address) {
  const binaryData = hex2bin(hash);
  const match = binaryData.match(/0+$/);
  return match ? match[0].length : 0;
}

export function trailing1s(hash: Address) {
  const binaryData = hex2bin(hash);
  const match = binaryData.match(/1+$/);
  return match ? match[0].length : 0;
}

export function longestStreakOf0s(hash: Address) {
  const binaryData = hex2bin(hash);
  const match = binaryData.match(/(0+)(?!.*\1)/);
  return match ? match[0].length : 0;
}

export function longestStreakOf1s(hash: Address) {
  const binaryData = hex2bin(hash);
  const match = binaryData.match(/(1+)(?!.*\1)/);
  return match ? match[0].length : 0;
}

export function maxDrift(hash: Address) {
  const driftArray = hex2bin(hash)
    .split('')
    .reduce(
      (prev, curr) => {
        const x = prev[prev.length - 1];
        const newX = curr === '0' ? x - 1 : x + 1;
        return prev.concat([newX]);
      },
      [0],
    );
  return Math.max(Math.abs(Math.min(...driftArray)), Math.max(...driftArray));
}

export function mapAttribute(attributeFn: Function, hash: Address, attributeRange: number[], valueRange: number[]) {
  const [attributeMin, attributeMax] = attributeRange;
  const [valueMin, valueMax] = valueRange;
  const tickSize = (valueMax - valueMin) / (attributeMax - attributeMin);

  return valueMin + attributeFn(hash) * tickSize;
}
