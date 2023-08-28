'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import useUpdate from '@/app/hooks/useUpdate';
import { INITIAL_SELECTED_HASH, LOADING_TEXT, VERIFY_MESSAGE } from '@/app/util/constants';
import { Tooltip } from 'react-tooltip';
import { useSignMessage } from 'wagmi';
import Button from '../../common/Button';

type Props = {
  isLoadingHashesData: boolean;
};

export function UpdateButton({ isLoadingHashesData }: Props) {
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
  const tooltipId = 'update-tooltip';

  function handleClick() {
    signMessage();
    if (isSuccess && signedData) {
      handleUpdate(signedData);
    }
  }

  return (
    <>
      <Button
        text={isLoadingHashesData ? LOADING_TEXT : 'UPDATE HASH'}
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
