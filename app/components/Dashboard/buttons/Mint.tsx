'use client';

import useHashesData from '@/app/hooks/useHashesData';
import useMintNewHash from '@/app/hooks/useMintNewHash';
import useUpdate from '@/app/hooks/useUpdate';
import { useAccount } from 'wagmi';
import Button from '../../common/Button';
import { Tooltip } from 'react-tooltip';
import { useHashContext } from '@/app/contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '@/app/util/constants';

const tooltipId = 'primary-action';
const loadingText = '...LOADING';
export default function Mint() {
  const { isConnected } = useAccount();
  const { handleMint } = useMintNewHash();
  const { selectedHash } = useHashContext();
  const { hashData, isError, isLoading: isLoadingHashesData } = useHashesData();
  const { handleSave, isDisabled: isDisabledViaSave } = useUpdate();
  const noHashSelected = selectedHash === INITIAL_SELECTED_HASH;

  if (!isConnected) {
    return null;
  }

  const button = hashData?.hashes.length
    ? {
        text: isLoadingHashesData ? loadingText : 'UPDATE HASH',
        fn: handleSave,
        isDisabled: isDisabledViaSave || isLoadingHashesData,
        tooltipText: 'Create a design and select a Hash to update.',
      }
    : {
        text: isLoadingHashesData ? loadingText : 'MINT HASH',
        fn: handleMint,
        isDisabled: isLoadingHashesData || noHashSelected,
        tooltipText: 'Generate a new Hash before minting.',
      };

  return (
    <>
      <Button
        text={button.text}
        buttonColor={'bg-primaryRed'}
        onClick={button.fn}
        disabled={button.isDisabled}
        data-tooltip-id={tooltipId}
        data-tooltip-content={button.tooltipText}
      />
      {button.isDisabled && <Tooltip id={tooltipId} />}
    </>
  );
}
