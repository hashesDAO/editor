import { Address } from 'viem';

export type TraitType = 'draw' | 'repeat' | 'pre-process' | 'post-process';

export type ChainNames = 'homestead' | 'mainnet' | 'goerli' | 'sepolia';

export type HashType = 'DAO' | 'DAO Deactivated' | 'Standard';

export type HashesData = {
  hash_value: Address;
  type: 'DAO' | 'Standard';
  token_id: number;
};

export type TraitValue = {
  id: string;
  content: string;
};

export type TraitObject = TraitValue & {
  type: TraitType;
  name: string;
};

export type ParsedTrait = {
  type: TraitType;
  description: string;
  traits: TraitObject[];
};
