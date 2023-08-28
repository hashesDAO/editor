'use client';

import useUpdate from '@/app/hooks/useUpdate';
import { LOADING_TEXT, VERIFY_MESSAGE } from '@/app/util/constants';
import { Tooltip } from 'react-tooltip';
import { useSignMessage } from 'wagmi';
import Button from '../../common/Button';

type Props = {
  isLoadingHashesData: boolean;
  noHashSelected: boolean;
};

const tooltipId = 'update-tooltip';

export function UpdateButton({ isLoadingHashesData, noHashSelected }: Props) {
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
