'use client';

import useCopyToClipboard from '@/app/hooks/useCopyToClipboard';
import useUpdate from '@/app/hooks/useUpdate';
import { LOADING_TEXT, messageToSign } from '@/app/util/constants';
import { HashesData } from '@/app/util/types';
import { Tooltip } from 'react-tooltip';
import { Address, useSignMessage } from 'wagmi';
import Button from '../../common/Button';

type Props = {
  isLoadingHashesData: boolean;
  noHashSelected: boolean;
  address: Address;
  selectedHashData: HashesData | undefined;
};

const tooltipId = 'update-tooltip';

export function UpdateButton({ isLoadingHashesData, noHashSelected, address, selectedHashData }: Props) {
  const { handleUpdate, isDisabled: isDisabledViaSave, updateData } = useUpdate();
  const { isError: isSignedError, isLoading: isSigning, signMessageAsync } = useSignMessage({ message: messageToSign });
  const [isCopied, copy] = useCopyToClipboard();
  const isDisabled = updateData?.loading || isDisabledViaSave || isLoadingHashesData || noHashSelected || isSigning;

  const buttonText = isLoadingHashesData
    ? LOADING_TEXT
    : isSigning || updateData?.loading
    ? 'UPDATING...'
    : 'UPDATE HASH';

  async function handleClick() {
    //TODO: handle error
    const signedData = await signMessageAsync();
    await handleUpdate(signedData, address, selectedHashData!);
  }

  function handleCopy(val: string) {
    copy(val);
  }

  return (
    <>
      {updateData.data?.url && (
        <p className="mx-4 text-green-500 text-xs">
          Hash updated ⚡️{' '}
          <div className="ml-2 underline cursor-pointer" onClick={() => handleCopy(updateData.data.url)}>
            {isCopied ? 'Copied!' : 'Copy hash url'}
          </div>
        </p>
      )}
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
