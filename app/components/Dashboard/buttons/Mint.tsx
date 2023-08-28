'use client';

import useHashesData from '@/app/hooks/useHashesData';
import useMintNewHash from '@/app/hooks/useMintNewHash';
import useUpdate from '@/app/hooks/useUpdate';
import { useAccount } from 'wagmi';
import Button from '../../common/Button';

export default function Mint() {
  const { isConnected } = useAccount();
  const { handleMint } = useMintNewHash();
  const { hashData, isError, isLoading: isLoadingHashesData } = useHashesData();
  const { handleSave, isDisabled: isDisabledViaSave } = useUpdate();

  if (!isConnected) {
    return null;
  }

  const button = hashData?.hashes.length
    ? {
        text: isLoadingHashesData ? '..LOADING' : 'UPDATE HASH',
        fn: handleSave,
        isDisabled: isDisabledViaSave || isLoadingHashesData,
      }
    : {
        text: isLoadingHashesData ? '...LOADING' : 'MINT HASH',
        fn: handleMint,
        isDisabled: isLoadingHashesData,
      };

  return <Button text={button.text} buttonColor={'bg-primaryRed'} onClick={button.fn} disabled={button.isDisabled} />;
}
