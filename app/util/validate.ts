import { isAddress } from 'viem';

export type hashType = 'DAO' | 'DAO Deactivated' | 'Standard';

export function getHashType(tokenId: string | string[], isDeactivated: boolean): hashType {
  return Number(tokenId) >= 1000 ? 'Standard' : isDeactivated ? 'DAO Deactivated' : 'DAO';
}

export function isValidAddress(address: string): boolean {
  return typeof address === 'string' && address.length !== 0 && isAddress(address);
}
