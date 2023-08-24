import { useHashContext } from '@/app/contexts/HashContext';
import { useProjectTitleContext } from '@/app/contexts/ProjectTitleContext';
import { useTraitsContext } from '@/app/contexts/TraitsContext';
import { Trait } from '@/app/reducers/traitsReducer';
import { INITIAL_SELECTED_HASH, LOADING } from '@/app/util/constants';
import { useReducer } from 'react';
import { fetchReducer, initialFetchReducerState } from '../reducers/fetchReducer';

export default function useSave() {
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
