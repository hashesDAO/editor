'use client';

import { FaSave } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import CircleButton from '../../common/CircleButton';

const tooltip = {
  id: 'save-tooltip',
  text: 'Create a title and design to save your project.',
};

export default function Save() {
  const isDisabled = true;

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
