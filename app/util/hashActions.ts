import { Address, encodePacked, keccak256 } from 'viem';
import { callReadOnlyFnFromHashesContract, callWriteFnFromHashesContract } from '.';
import { ChainNames } from './types';

export async function generateHash(input: string, address: Address, chain: ChainNames): Promise<Address | Error> {
  try {
    const nonce = await callReadOnlyFnFromHashesContract(chain, 'nonce');
    return keccak256(encodePacked(['uint256', 'address', 'string'], [nonce as bigint, address, input]));
  } catch (error) {
    return new Error(`error within generateHash(): ${error}`);
  }
}

export async function mintHash(phrase: string, mintFee: number, chain: ChainNames) {
  try {
    return await callWriteFnFromHashesContract(chain, 'generate', [mintFee, phrase]);
  } catch (error) {
    return new Error(`error within mintHash(): ${error}`);
  }
}
