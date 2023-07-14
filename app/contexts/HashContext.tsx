import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type SelectedHash = `0x${string}`;
type HashDispatch = Dispatch<SetStateAction<HashState | undefined>>;
type HashState = {
  selectedHash: SelectedHash;
};

const HashContext = createContext<{ selectedHash: SelectedHash } | undefined>(undefined);
const HashDispatchContext = createContext<HashDispatch | undefined>(undefined);

export function HashContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedHash, setSelectedHash] = useState<HashState>();

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
