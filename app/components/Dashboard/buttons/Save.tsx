'use client';

import useCopyToClipboard from '@/app/hooks/useCopyToClipboard';
import useSave from '@/app/hooks/useSave';
import { FaSave } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import CircleButton from '../../common/CircleButton';

const errMessage = 'Error occurred while saving your project. Please try again.';
const tooltip = {
  id: 'save-tooltip',
  text: 'Create a title and design to save your project.',
};

export default function Save() {
  const { handleSave, isDisabled, saveData } = useSave();
  const [isCopied, copy] = useCopyToClipboard();

  function handleCopy(slug: string) {
    copy(`${window.location.origin}/collect/${slug}`);
  }

  return (
    <div className="flex items-center">
      <CircleButton
        onClick={handleSave}
        data-tooltip-id={tooltip.id}
        data-tooltip-content={tooltip.text}
        disabled={isDisabled}
        styles="disabled:cursor-not-allowed"
      >
        {saveData.loading ? <p className="text-xs">...saving</p> : <FaSave fontSize={'1.25rem'} />}
      </CircleButton>
      {isDisabled && <Tooltip id={tooltip.id} />}
      {saveData.error && <p className="ml-2 text-red-500 text-xs">{errMessage}</p>}
      {saveData.data && (
        <p className="ml-2 text-green-500 text-xs">
          Project saved ⚡️{' '}
          <span className="ml-2 underline cursor-pointer" onClick={() => handleCopy(saveData.data)}>
            {isCopied ? 'Copied!' : 'Copy project link'}
          </span>
        </p>
      )}
    </div>
  );
}
