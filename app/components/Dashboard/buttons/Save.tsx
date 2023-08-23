'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import { useTraitsContext } from '@/app/contexts/TraitsContext';
import { INITIAL_SELECTED_HASH } from '@/app/util/constants';
import { FaSave } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import CircleButton from '../../common/CircleButton';
import { useProjectTitleContext } from '@/app/contexts/ProjectTitleContext';

const tooltip = {
  id: 'save-tooltip',
  text: 'Create a title and design to save your project.',
};

export default function Save() {
  const title = useProjectTitleContext();
  const selectedTraits = useTraitsContext();
  const { selectedHash } = useHashContext();
  const isDisabled = title.length === 0 || selectedTraits.length === 0 || selectedHash === INITIAL_SELECTED_HASH;

  function handleSave() {
    console.log('SAVE');
  }

  return (
    <>
      <CircleButton
        onClick={handleSave}
        data-tooltip-id={tooltip.id}
        data-tooltip-content={tooltip.text}
        disabled={isDisabled}
        styles="disabled:cursor-not-allowed"
      >
        <FaSave fontSize={'1.25rem'} />
      </CircleButton>
      {isDisabled && <Tooltip id={tooltip.id} />}
    </>
  );
}
