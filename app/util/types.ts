import { Address } from 'viem';
import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from './constants';

export type TraitType = typeof ARTISTIC | typeof AUGMENT | typeof GEOMETRY | typeof PATTERNS;

export type ChainNames = 'homestead' | 'mainnet' | 'goerli';

export type HashesData = {
  hash_value: Address;
  type: 'DAO' | 'Standard';
  token_id: number;
};

export type TraitValue = {
  id: string;
  content: string;
};
