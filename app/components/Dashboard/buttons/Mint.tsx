'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import useHashesData from '@/app/hooks/useHashesData';
import { mintHash } from '@/app/util/hashActions';
import { ChainNames } from '@/app/util/types';
import { useAccount, useNetwork } from 'wagmi';
import Button from '../../common/Button';

export default function Mint() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { selectedHash, selectedHashPhrase } = useHashContext();
  const { hashData } = useHashesData();
  const { hashes } = hashData || {};
  const parsedHashes = hashes?.map(({ hash_value }) => hash_value);

  if (!isConnected) {
    return null;
  }

  function handleClick() {
    console.log(`mint with ${selectedHash} and ${selectedHashPhrase}!`);

    if (!parsedHashes || !parsedHashes.includes(selectedHash)) {
      if (!chain?.network) {
        console.error('no chain network found');
        return;
      }
      mintHash(selectedHashPhrase, chain.network as ChainNames);
    } else {
      console.log(`hash found ${selectedHash}`);
    }
  }

  return <Button text={'UPDATE HASH'} buttonColor={'bg-primaryRed'} onClick={handleClick} />;
}
