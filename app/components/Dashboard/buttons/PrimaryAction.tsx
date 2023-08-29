'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import useHashesData from '@/app/hooks/useHashesData';
import { noHashSelected } from '@/app/util';
import { useAccount } from 'wagmi';
import MintButton from './Mint';
import { UpdateButton } from './Update';

export default function PrimaryActionButton() {
  const { hashData, isError, isLoading } = useHashesData();
  const { selectedHash } = useHashContext();
  const { isConnected, address } = useAccount();

  const selectedHashData = hashData?.hashes.find(({ hash_value }) => hash_value === selectedHash);

  if (!isConnected) {
    return null;
  }

  return (
    <>
      {hashData?.hashes.length ? (
        <UpdateButton
          noHashSelected={noHashSelected(selectedHash)}
          isLoadingHashesData={isLoading}
          address={address!}
          selectedHashData={selectedHashData}
        />
      ) : (
        <MintButton noHashSelected={noHashSelected(selectedHash)} isLoadingHashesData={isLoading} />
      )}
    </>
  );
}
