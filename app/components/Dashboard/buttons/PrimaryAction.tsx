'use client';

import useHashesData from '@/app/hooks/useHashesData';
import { useAccount } from 'wagmi';
import MintButton from './Mint';
import { UpdateButton } from './Update';
import { useHashContext } from '@/app/contexts/HashContext';
import { noHashSelected } from '@/app/util';

export default function PrimaryActionButton() {
  const { hashData, isError, isLoading } = useHashesData();
  const { selectedHash } = useHashContext();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return (
    <>
      {hashData?.hashes.length ? (
        <UpdateButton noHashSelected={noHashSelected(selectedHash)} isLoadingHashesData={isLoading} />
      ) : (
        <MintButton noHashSelected={noHashSelected(selectedHash)} isLoadingHashesData={isLoading} />
      )}
    </>
  );
}
