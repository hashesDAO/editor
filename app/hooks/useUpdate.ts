import { useHashContext } from '@/app/contexts/HashContext';
import { useTraitsContext } from '@/app/contexts/TraitsContext';
import { INITIAL_SELECTED_HASH, LOADING } from '@/app/util/constants';
import { useReducer } from 'react';
import { Address } from 'viem';
import { fetchReducer, initialFetchReducerState } from '../reducers/fetchReducer';
import { HashesData } from '../util/types';

export default function useUpdate() {
  const [updateData, dispatchUpdateData] = useReducer(fetchReducer, initialFetchReducerState);
  const selectedTraits = useTraitsContext();
  const { selectedHash } = useHashContext();
  const isDisabled = updateData.loading || selectedTraits.length === 0 || selectedHash === INITIAL_SELECTED_HASH;

  async function handleUpdate(signature: Address, address: Address, selectedHashData: HashesData) {
    dispatchUpdateData({ type: LOADING });
    await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hash: selectedHashData.hash_value,
        tokenId: selectedHashData.token_id,
        image: selectedTraits.map((trait) => trait.id),
        signature,
        address,
      }),
    })
      .then(async (res) => {
        const payloadData = await res.json();
        dispatchUpdateData({
          type: 'SUCCESS',
          payload: payloadData,
        });
      })
      .catch((err) => {
        console.error(`error updating hash metadata: ${err}`);
        dispatchUpdateData({
          type: 'ERROR',
          payload: err,
        });
      });
  }

  return { handleUpdate, isDisabled, updateData };
}
