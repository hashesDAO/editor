'use client';

import useUpdate from '@/app/hooks/useUpdate';
import { LOADING_TEXT } from '@/app/util/constants';
import { Tooltip } from 'react-tooltip';
import { useSignMessage } from 'wagmi';
import Button from '../../common/Button';

type Props = {
  isLoadingHashesData: boolean;
  noHashSelected: boolean;
};

const tooltipId = 'update-tooltip';

export const verifyMessage = 'Sign message to verify ownership of your selected Hash.';

export function UpdateButton({ isLoadingHashesData, noHashSelected }: Props) {
  const { handleUpdate, isDisabled: isDisabledViaSave, updateData } = useUpdate();
  const {
    isError: isSignedError,
    isLoading: isSignedLoading,
    isSuccess,
    signMessageAsync,
  } = useSignMessage({
    message: verifyMessage,
  });

  const isDisabled =
    updateData?.loading || isDisabledViaSave || isLoadingHashesData || noHashSelected || isSignedLoading;

  const buttonText = isLoadingHashesData
    ? LOADING_TEXT
    : isSignedLoading || updateData?.loading
    ? 'UPDATING...'
    : 'UPDATE HASH';

  async function handleClick() {
    //TODO: handle error
    const signedData = await signMessageAsync();
    await handleUpdate(signedData!);
  }

  return (
    <>
      <Button
        text={buttonText}
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
