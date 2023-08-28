'use client';

import useHashesData from '@/app/hooks/useHashesData';
import { useAccount } from 'wagmi';
import MintButton from './Mint';
import { UpdateButton } from './Update';

export default function PrimaryActionButton() {
  const { hashData, isError, isLoading } = useHashesData();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return (
    <>
      {hashData?.hashes.length ? (
        <UpdateButton isLoadingHashesData={isLoading} />
      ) : (
        <MintButton isLoadingHashesData={isLoading} />
      )}
    </>
  );
}
