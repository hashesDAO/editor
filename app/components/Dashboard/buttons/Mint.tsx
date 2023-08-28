'use client';

import useMintNewHash from '@/app/hooks/useMintNewHash';
import { LOADING_TEXT } from '@/app/util/constants';
import { Tooltip } from 'react-tooltip';
import Button from '../../common/Button';

type Props = {
  isLoadingHashesData: boolean;
  noHashSelected: boolean;
};

const tooltipId = 'mint-tooltip';

export default function MintButton({ isLoadingHashesData, noHashSelected }: Props) {
  const { handleMint } = useMintNewHash();
  const isDisabled = isLoadingHashesData || noHashSelected;
  return (
    <>
      <Button
        text={isLoadingHashesData ? LOADING_TEXT : 'MINT HASH'}
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
