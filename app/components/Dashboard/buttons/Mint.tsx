'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import { useAccount } from 'wagmi';
import Button from '../../common/Button';

export default function Mint() {
  const { isConnected } = useAccount();
  const { selectedHash, selectedHashPhrase } = useHashContext();

  if (!isConnected) {
    return null;
  }

  return (
    <Button
      text={'UPDATE HASH'}
      buttonColor={'bg-primaryRed'}
      onClick={() => {
        console.log(`mint with ${selectedHash} and ${selectedHashPhrase}!`);
      }}
    />
  );
}
