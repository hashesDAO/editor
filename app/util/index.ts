import { createPublicClient, http } from 'viem';
import { goerli, mainnet } from 'viem/chains';
import { hashesContract } from './hashesContract';
import { ChainNames } from './types';

export const MAINNET_HASHES_ADDRESS = '0xD07e72b00431af84AD438CA995Fd9a7F0207542d';

export const HASHES_ADDRESS: { [key: string]: `0x${string}` } = {
  homestead: MAINNET_HASHES_ADDRESS,
  mainnet: MAINNET_HASHES_ADDRESS,
  goerli: '0x2Fe6A4F23ac78c137Ce7D2aD9108a607b624AF5C',
};

export async function callReadOnlyFnFromHashesContract(chain: ChainNames, functionName: string, args: any[]) {
  const client = createPublicClient({
    chain: chain === 'goerli' ? goerli : mainnet,
    transport: http(),
  });

  try {
    //TODO: fix type errors
    const res = await client.readContract({
      ...hashesContract,
      // @ts-ignore: Unreachable code error
      functionName, //
      address: HASHES_ADDRESS[chain],
      // @ts-ignore: Unreachable code error
      args,
    });

    return res;
  } catch (error) {
    return new Error(`error from callReadOnlyFnFromHashesContract: ${error}`);
  }
}
