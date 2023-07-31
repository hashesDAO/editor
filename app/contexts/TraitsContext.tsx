'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

export type TraitsData = {
  id: string;
  content: string;
};

type TraitsDispatch = Dispatch<SetStateAction<TraitsData | undefined>>;

const TraitsContext = createContext<TraitsData | undefined>(undefined);
const TraitsDispatchContext = createContext<TraitsDispatch | undefined>(undefined);

export function TraitsContextProvider({ children }: { children: React.ReactNode }) {
  const [TraitsData, setTraitsData] = useState<TraitsData>();

  return (
    <TraitsContext.Provider value={TraitsData}>
      <TraitsDispatchContext.Provider value={setTraitsData}>{children}</TraitsDispatchContext.Provider>
    </TraitsContext.Provider>
  );
}

export function useTraitsContext() {
  const context = useContext(TraitsContext);
  if (context === undefined) {
    throw new Error('useTraitsContext must be used within a TraitsContextProvider');
  }
  return context;
}

export function useTraitsDispatch() {
  const context = useContext(TraitsDispatchContext);
  if (context === undefined) {
    throw new Error('useTraitsDispatch must be used within a TraitsContextProvider');
  }
  return context;
}
