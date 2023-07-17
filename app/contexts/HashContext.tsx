'use client';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { Address } from 'viem';
import useSelectedHash from '../hooks/useSelectedHash';

export type SelectedHash = Address;
type HashDispatch = Dispatch<SetStateAction<SelectedHash | undefined>>;

const HashContext = createContext<SelectedHash | undefined>(undefined);
const HashDispatchContext = createContext<HashDispatch | undefined>(undefined);

export function HashContextProvider({ children }: { children: React.ReactNode }) {
  const { selectedHash, setSelectedHash } = useSelectedHash();

  return (
    <HashContext.Provider value={selectedHash}>
      <HashDispatchContext.Provider value={setSelectedHash}>{children}</HashDispatchContext.Provider>
    </HashContext.Provider>
  );
}

export function useHashContext() {
  const context = useContext(HashContext);
  if (context === undefined) {
    throw new Error('useHashContext must be used within a HashContextProvider');
  }
  return context;
}

export function useHashDispatch() {
  const context = useContext(HashDispatchContext);
  if (context === undefined) {
    throw new Error('useHashDispatch must be used within a HashContextProvider');
  }
  return context;
}
