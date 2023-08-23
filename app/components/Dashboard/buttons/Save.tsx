'use client';

import { useHashContext } from '@/app/contexts/HashContext';
import { useProjectTitleContext } from '@/app/contexts/ProjectTitleContext';
import { useTraitsContext } from '@/app/contexts/TraitsContext';
import { Trait } from '@/app/reducers/traitsReducer';
import { INITIAL_SELECTED_HASH } from '@/app/util/constants';
import { FaSave } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import CircleButton from '../../common/CircleButton';

const tooltip = {
  id: 'save-tooltip',
  text: 'Create a title and design to save your project.',
};

async function updateDB(data: { title: string; traitIds: string[] }) {
  await fetch('/api/traits/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(`error saving traits: ${err}`);
    });
}

function useUpdateDB() {
  const title = useProjectTitleContext();
  const selectedTraits = useTraitsContext();
  const { selectedHash } = useHashContext();
  const isDisabled = title.length === 0 || selectedTraits.length === 0 || selectedHash === INITIAL_SELECTED_HASH;

  async function handleSave() {
    await updateDB({
      title,
      traitIds: selectedTraits.map((trait: Trait) => trait.id),
    });
  }

  return { handleSave, isDisabled };
}

export default function Save() {
  const { handleSave, isDisabled } = useUpdateDB();

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
