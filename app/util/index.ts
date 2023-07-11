import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from './constants';
import HASHES_ABI from './Hashes.json';
import type { Network } from './types';

export type TraitType = typeof ARTISTIC | typeof AUGMENT | typeof GEOMETRY | typeof PATTERNS;

export const NETWORKS: Record<string, Network> = {
  homestead: {
    title: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://etherscan.io',
    explorerApiUrl: 'https://api.etherscan.io/api',
    chainId: '1',
  },
  mainnet: {
    title: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://etherscan.io',
    explorerApiUrl: 'https://api.etherscan.io/api',
    chainId: '1',
  },
  goerli: {
    title: 'Goerli',
    rpcUrl: 'https://goerli.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://goerli.etherscan.io',
    explorerApiUrl: 'https://api-goerli.etherscan.io/api',
    chainId: '5',
  },
};

export const HASHES_ADDRESS: { [key: string]: string } = {
  homestead: '0xD07e72b00431af84AD438CA995Fd9a7F0207542d',
  mainnet: '0xD07e72b00431af84AD438CA995Fd9a7F0207542d',
  goerli: '0x2Fe6A4F23ac78c137Ce7D2aD9108a607b624AF5C',
};

export function getHashesContract(chain: string): ethers.Contract {
  const rpcUrl = NETWORKS[chain].rpcUrl.replace('%INFURA_API_KEY%', process.env['NEXT_PUBLIC_INFURA_API_KEY']!);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const newContract = new ethers.Contract(HASHES_ADDRESS[chain], HASHES_ABI.abi, provider);
  return newContract;
}
