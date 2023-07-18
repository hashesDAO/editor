'use client';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { Address } from 'viem';
import useSelectedHash from '../hooks/useSelectedHash';

export type SelectedHashData = {
  selectedHash: Address;
  selectedHashPhrase: string;
};

type HashDispatch = Dispatch<SetStateAction<SelectedHashData>>;

const HashContext = createContext<SelectedHashData | undefined>(undefined);
const HashDispatchContext = createContext<HashDispatch | undefined>(undefined);

export function HashContextProvider({ children }: { children: React.ReactNode }) {
  const { selectedHashData, setSelectedHashData } = useSelectedHash();

  return (
    <HashContext.Provider value={selectedHashData}>
      <HashDispatchContext.Provider value={setSelectedHashData}>{children}</HashDispatchContext.Provider>
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
