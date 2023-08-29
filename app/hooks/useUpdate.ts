import { useHashContext } from '@/app/contexts/HashContext';
import { INITIAL_SELECTED_HASH, LOADING } from '@/app/util/constants';
import { useReducer } from 'react';
import { Address } from 'viem';
import { useNetwork } from 'wagmi';
import { useRenderedImageContext } from '../contexts/RenderedImageContext';
import { fetchReducer, initialFetchReducerState } from '../reducers/fetchReducer';
import { HashesData } from '../util/types';

export default function useUpdate() {
  const [updateData, dispatchUpdateData] = useReducer(fetchReducer, initialFetchReducerState);
  const { selectedHash } = useHashContext();
  const { chain } = useNetwork();
  const image = useRenderedImageContext();
  const isDisabled = updateData.loading || image.length === 0 || selectedHash === INITIAL_SELECTED_HASH;

  async function handleUpdate(signature: Address, address: Address, selectedHashData: HashesData) {
    dispatchUpdateData({ type: LOADING });
    await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hash: selectedHashData.hash_value,
        tokenId: selectedHashData.token_id,
        image,
        signature,
        address,
        chain: chain?.network,
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
