import { keccak256, encodePacked, Address } from 'viem';

export function generateHash(input: string, address: Address) {
  return keccak256(encodePacked(['uint256', 'address', 'string'], [BigInt(461), address, input]));
}
