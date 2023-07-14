'use client';

import Button from '../../common/Button';
import { generateHash } from '@/app/util/generateHash';
import { useAccount } from 'wagmi';
export default function Generate() {
  const { address } = useAccount();
  return (
    <Button
      text={'GENERATE'}
      onClick={() => {
        const hash = generateHash('Satoshi', address!);
        console.log(`generated: ${hash}`);
      }}
    />
  );
}
