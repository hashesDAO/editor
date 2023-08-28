'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import useHashesData from '@/app/hooks/useHashesData';
import useMintNewHash from '@/app/hooks/useMintNewHash';
import useUpdate from '@/app/hooks/useUpdate';
import { INITIAL_SELECTED_HASH, VERIFY_MESSAGE } from '@/app/util/constants';
import { Tooltip } from 'react-tooltip';
import { useAccount, useSignMessage } from 'wagmi';
import Button from '../../common/Button';

type ButtonProps = {
  isLoadingHashesData: boolean;
};

const tooltipId = 'primary-action';
const loadingText = '...LOADING';

function noHashSelected(hash: string) {
  return hash === INITIAL_SELECTED_HASH;
}

function MintButton({ isLoadingHashesData }: ButtonProps) {
  const { selectedHash } = useHashContext();
  const { handleMint } = useMintNewHash();
  const isDisabled = isLoadingHashesData || noHashSelected(selectedHash);
  return (
    <>
      <Button
        text={isLoadingHashesData ? loadingText : 'MINT HASH'}
        buttonColor={'bg-primaryRed'}
        onClick={handleMint}
        disabled={isDisabled}
        data-tooltip-id={tooltipId}
        data-tooltip-content={'Generate a new Hash before minting.'}
      />
      {isDisabled && <Tooltip id={tooltipId} />}
    </>
  );
}

function UpdateButton({ isLoadingHashesData }: ButtonProps) {
  const { selectedHash } = useHashContext();
  const { handleUpdate, isDisabled: isDisabledViaSave } = useUpdate();
  const {
    data: signedData,
    isError: isSignedError,
    isLoading: isSignedLoading,
    isSuccess,
    signMessage,
  } = useSignMessage({
    message: VERIFY_MESSAGE,
  });

  console.log('signedData', signedData);

  const noHashSelected = selectedHash === INITIAL_SELECTED_HASH;
  const isDisabled = isDisabledViaSave || isLoadingHashesData || noHashSelected || isSignedLoading;

  function handleClick() {
    signMessage();
    if (isSuccess && signedData) {
      handleUpdate(signedData);
    }
  }

  return (
    <>
      <Button
        text={isLoadingHashesData ? loadingText : 'UPDATE HASH'}
        buttonColor={'bg-primaryRed'}
        onClick={handleClick}
        disabled={isDisabled}
        data-tooltip-id={tooltipId}
        data-tooltip-content={'Create a design and select a Hash to update.'}
      />
      {isDisabled && <Tooltip id={tooltipId} />}
    </>
  );
}

export default function Blah() {
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
