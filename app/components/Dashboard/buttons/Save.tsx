'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import { useProjectTitleContext } from '@/app/contexts/ProjectTitleContext';
import { useTraitsContext } from '@/app/contexts/TraitsContext';
import useCopyToClipboard from '@/app/hooks/useCopyToClipboard';
import { Trait } from '@/app/reducers/traitsReducer';
import { INITIAL_SELECTED_HASH, LOADING } from '@/app/util/constants';
import { useReducer } from 'react';
import { FaSave } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { fetchReducer, initialFetchReducerState } from '../../../reducers/fetchReducer';
import CircleButton from '../../common/CircleButton';

function useSave() {
  const [saveData, dispatchSaveData] = useReducer(fetchReducer, initialFetchReducerState);
  const title = useProjectTitleContext();
  const selectedTraits = useTraitsContext();
  const { selectedHash } = useHashContext();
  const isDisabled =
    saveData.loading || title.length === 0 || selectedTraits.length === 0 || selectedHash === INITIAL_SELECTED_HASH;

  async function handleSave() {
    dispatchSaveData({ type: LOADING });
    await fetch('/api/traits/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        traitIds: selectedTraits.map((trait: Trait) => trait.id),
      }),
    })
      .then(async (res) => {
        const payloadData = await res.json();
        console.log('payloadData', payloadData);

        dispatchSaveData({
          type: 'SUCCESS',
          payload: payloadData.slug,
        });
      })
      .catch((err) => {
        console.error(`error saving traits: ${err}`);
        dispatchSaveData({
          type: 'ERROR',
          payload: err,
        });
      });
  }

  return { handleSave, isDisabled, saveData };
}

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
          Project saved!{' '}
          <span className="ml-2 underline cursor-pointer" onClick={() => handleCopy(saveData.data)}>
            {isCopied ? 'Copied!' : 'Copy project link'}
          </span>
        </p>
      )}
    </div>
  );
}
