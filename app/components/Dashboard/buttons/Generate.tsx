'use client';

import Button from '../../common/Button';
import { generateHash } from '@/app/util/generateHash';
import { ChainNames } from '@/app/util/types';
import { useAccount, useNetwork } from 'wagmi';
export default function Generate() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  return (
    <Button
      text={'GENERATE'}
      onClick={() => {
        if (!address || !chain?.network) {
          console.error('no linked user address or chain');
          return;
        }
        const hash = generateHash('smoking', address, chain.network as ChainNames);
        console.log(`generated: ${hash}`);
      }}
    />
  );
}
