import { Abi, Address, createPublicClient, createWalletClient, custom, http, isAddress } from 'viem';
import { goerli, sepolia, mainnet } from 'viem/chains';
import { Chain } from 'wagmi';
import { hashesContract } from './hashesContract';
import type { ChainNames, HashType } from './types';
import { INITIAL_SELECTED_HASH } from './constants';

export const MAINNET_HASHES_ADDRESS = '0xD07e72b00431af84AD438CA995Fd9a7F0207542d';

export const HASHES_ADDRESS: { [key: string]: Address } = {
  homestead: MAINNET_HASHES_ADDRESS,
  mainnet: MAINNET_HASHES_ADDRESS,
  goerli: '0x2Fe6A4F23ac78c137Ce7D2aD9108a607b624AF5C',
  sepolia: '0x61A4cF946855F5985372D3b148267Ead3b931Cb8',
};

enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  GOERLI = 5,
  KOVAN = 42,
  SEPOLIA = 11155111,
}

export function getChainIdFromNetworkName(chainId: string) {
  switch (chainId) {
    case 'mainnet':
      return ChainId.MAINNET;
    case 'homestead':
      return ChainId.MAINNET;
    case 'ropsten':
      return ChainId.ROPSTEN;
    case 'goerli':
      return ChainId.GOERLI;
    case 'kovan':
      return ChainId.KOVAN;
    case 'sepolia':
      return ChainId.SEPOLIA;
    default:
      return ChainId.MAINNET;
  }
}

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

function getChain(chain: ChainNames) {
  switch (chain) {
    case 'goerli':
      return goerli;
    case 'sepolia':
      return sepolia;
    default:
      return mainnet;
  }
}

export async function callReadOnlyFnFromHashesContract(chain: ChainNames, functionName: string, args?: any[]) {
  const client = createPublicClient({
    chain: getChain(chain),
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

export async function callWriteFnFromHashesContract(
  chain: ChainNames,
  functionName: string,
  args?: any[],
  value?: bigint,
) {
  const parsedChain = getChain(chain);
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
      value,
    });

    return await walletClient.writeContract(request);
  } catch (error) {
    return new Error(`error from callWriteFnFromHashesContract: ${error}`);
  }
}

export function getHashType(tokenId: string | string[], isDeactivated: boolean): HashType {
  return Number(tokenId) >= 1000 ? 'Standard' : isDeactivated ? 'DAO Deactivated' : 'DAO';
}

export function isValidAddress(address: string): boolean {
  return typeof address === 'string' && address.length !== 0 && isAddress(address);
}

export function noHashSelected(hash: string) {
  return hash === INITIAL_SELECTED_HASH;
}
