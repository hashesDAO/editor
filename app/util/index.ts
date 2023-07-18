import { Abi, Address, createPublicClient, createWalletClient, custom, http } from 'viem';
import { goerli, mainnet } from 'viem/chains';
import { Chain } from 'wagmi';
import { hashesContract } from './hashesContract';
import { ChainNames } from './types';

export const MAINNET_HASHES_ADDRESS = '0xD07e72b00431af84AD438CA995Fd9a7F0207542d';

export const HASHES_ADDRESS: { [key: string]: Address } = {
  homestead: MAINNET_HASHES_ADDRESS,
  mainnet: MAINNET_HASHES_ADDRESS,
  goerli: '0x2Fe6A4F23ac78c137Ce7D2aD9108a607b624AF5C',
};

function getPublicClient({ chain }: { chain: Chain }) {
  return createPublicClient({
    chain,
    transport: http(),
  });
}

function getWalletClient({ chain }: { chain: Chain }) {
  return createWalletClient({
    chain,
    // @ts-ignore: Unreachable code error
    transport: custom(window.ethereum),
  });
}

export async function callReadOnlyFnFromHashesContract(chain: ChainNames, functionName: string, args?: any[]) {
  const client = createPublicClient({
    chain: chain === 'goerli' ? goerli : mainnet,
    transport: http(),
  });

  try {
    const res = await client.readContract({
      ...hashesContract,
      functionName: functionName as any,
      address: HASHES_ADDRESS[chain],
      args: args as any,
    });

    return res;
  } catch (error) {
    return new Error(`error from callReadOnlyFnFromHashesContract: ${error}`);
  }
}

export async function callWriteFnFromHashesContract(chain: ChainNames, functionName: string, args?: any[]) {
  const parsedChain = chain === 'goerli' ? goerli : mainnet;
  const client = getPublicClient({ chain: parsedChain });
  const walletClient = getWalletClient({ chain: parsedChain });
  const [account] = await walletClient.getAddresses();

  try {
    const { request } = await client.simulateContract({
      abi: hashesContract.abi as Abi,
      functionName,
      address: HASHES_ADDRESS[chain],
      account,
      args,
    });

    await walletClient.writeContract(request);
  } catch (error) {
    return new Error(`error from callWriteFnFromHashesContract: ${error}`);
  }
}
