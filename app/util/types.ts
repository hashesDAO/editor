import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from './constants';

export type TraitType = typeof ARTISTIC | typeof AUGMENT | typeof GEOMETRY | typeof PATTERNS;

export type ChainNames = 'homestead' | 'mainnet' | 'goerli';

export type HashesData = {
  hash_value: `0x${string}`;
  type: 'DAO' | 'Standard';
  token_id: number;
};
