'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import { useAccount } from 'wagmi';
import Button from '../../common/Button';
import useHashesData from '@/app/hooks/useHashesData';

function mint() {}

export default function Mint() {
  const { isConnected } = useAccount();
  const selectedHash = useHashContext();
  const { hashData } = useHashesData();
  const { hashes } = hashData || {};
  const parsedHashes = hashes?.map(({ hash_value }) => hash_value);

  if (!isConnected) {
    return null;
  }

  function handleClick() {
    console.log(`mint with ${selectedHash}!`);

    if (!parsedHashes || !parsedHashes.includes(selectedHash)) {
      // mint();
    } else {
      console.log(`hash found ${selectedHash}`);
    }
  }

  return <Button text={'UPDATE HASH'} buttonColor={'bg-primaryRed'} onClick={handleClick} />;
}
