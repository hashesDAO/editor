import { createPublicClient, getContract, http } from 'viem';
import { goerli, mainnet } from 'viem/chains';
import { hashesContract } from './hashesContract';

export const HASHES_ADDRESS: { [key: string]: `0x${string}` } = {
  homestead: '0xD07e72b00431af84AD438CA995Fd9a7F0207542d',
  mainnet: '0xD07e72b00431af84AD438CA995Fd9a7F0207542d',
  goerli: '0x2Fe6A4F23ac78c137Ce7D2aD9108a607b624AF5C',
};

export function getHashesContract(chain: string) {
  const client = createPublicClient({
    chain: chain === 'goerli' ? goerli : mainnet,
    transport: http(),
  });

  const contract = getContract({
    ...hashesContract,
    address: HASHES_ADDRESS[chain],
    publicClient: client,
  });

  return contract;
}
