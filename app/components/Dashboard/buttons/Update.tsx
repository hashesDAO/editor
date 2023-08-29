'use client';

import useUpdate from '@/app/hooks/useUpdate';
import { LOADING_TEXT, messageToSign } from '@/app/util/constants';
import { Tooltip } from 'react-tooltip';
import { Address, useSignMessage } from 'wagmi';
import Button from '../../common/Button';
import { HashesData } from '@/app/util/types';

type Props = {
  isLoadingHashesData: boolean;
  noHashSelected: boolean;
  address: Address;
  selectedHashData: HashesData | undefined;
};

const tooltipId = 'update-tooltip';

export function UpdateButton({ isLoadingHashesData, noHashSelected, address, selectedHashData }: Props) {
  const { handleUpdate, isDisabled: isDisabledViaSave, updateData } = useUpdate();
  const {
    isError: isSignedError,
    isLoading: isSignedLoading,
    isSuccess,
    signMessageAsync,
  } = useSignMessage({
    message: messageToSign,
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
    await handleUpdate(signedData, address, selectedHashData);
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
