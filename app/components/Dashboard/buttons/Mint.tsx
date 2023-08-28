'use client';

import useHashesData from '@/app/hooks/useHashesData';
import useMintNewHash from '@/app/hooks/useMintNewHash';
import useUpdate from '@/app/hooks/useUpdate';
import { useAccount, useSignMessage } from 'wagmi';
import Button from '../../common/Button';
import { Tooltip } from 'react-tooltip';
import { useHashContext } from '@/app/contexts/HashContext';
import { INITIAL_SELECTED_HASH, VERIFY_MESSAGE } from '@/app/util/constants';

const tooltipId = 'primary-action';
const loadingText = '...LOADING';

function noHashSelected(hash: string) {
  return hash === INITIAL_SELECTED_HASH;
}

function MintButton() {
  const { selectedHash } = useHashContext();
  const { handleMint } = useMintNewHash();
  const { isLoading: isLoadingHashesData } = useHashesData();
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

function UpdateButton() {
  const { isConnected } = useAccount();
  const { selectedHash } = useHashContext();
  const { hashData, isError, isLoading: isLoadingHashesData } = useHashesData();
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

  if (!isConnected) {
    return null;
  }

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
  const { hashData, isError, isLoading: isLoadingHashesData } = useHashesData();
  {
    hashData?.hashes.length ? <UpdateButton /> : <MintButton />;
  }
}
