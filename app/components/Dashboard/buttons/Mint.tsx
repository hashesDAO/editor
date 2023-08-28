'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import useMintNewHash from '@/app/hooks/useMintNewHash';
import { LOADING_TEXT } from '@/app/util/constants';
import { noHashSelected } from '@/app/util';
import { Tooltip } from 'react-tooltip';
import Button from '../../common/Button';

type Props = {
  isLoadingHashesData: boolean;
};

export default function MintButton({ isLoadingHashesData }: Props) {
  const { selectedHash } = useHashContext();
  const { handleMint } = useMintNewHash();
  const isDisabled = isLoadingHashesData || noHashSelected(selectedHash);
  const tooltipId = 'mint-tooltip';
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
