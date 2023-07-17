import { keccak256, encodePacked, Address } from 'viem';

export function generateHash(input: string, address: Address) {
  // return keccak256(encodePacked(['uint256', 'address', 'string'], [BigInt(461), address, input]));
  return keccak256(
    encodePacked(
      ['uint256', 'address', 'string'],
      [BigInt(1063), '0x9fdc28740f4ccd64e51451480d0a2a4df5b98f90', 'smoking'],
    ),
  );
}
