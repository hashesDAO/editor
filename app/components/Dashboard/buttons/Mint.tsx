'use client';

import { useAccount } from 'wagmi';
import useMintNewHash from '@/app/hooks/useMintNewHash';
import Button from '../../common/Button';

export default function Mint() {
  const { isConnected } = useAccount();
  const { handleMint } = useMintNewHash();
  if (!isConnected) {
    return null;
  }

  return <Button text={'UPDATE HASH'} buttonColor={'bg-primaryRed'} onClick={handleMint} />;
}
