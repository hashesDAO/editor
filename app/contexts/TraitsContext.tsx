'use client';

import { createContext, useContext, useReducer } from 'react';
import { Trait, traitsReducer } from '../reducers/traitsReducer';

export type TraitsData = {
  id: string;
  content: string;
};

type DispatchFns = {
  handleUpdateTrait: (shouldAdd: boolean, id: string, functionContent: string) => void;
};

const TraitsContext = createContext<Trait[] | undefined>(undefined);
const TraitsDispatchContext = createContext<DispatchFns | undefined>(undefined);

export function TraitsContextProvider({ children }: { children: React.ReactNode }) {
  const [traitsData, dispatch] = useReducer(traitsReducer, []);

  function handleUpdateTrait(shouldAdd: boolean, id: string, functionContent: string) {
    dispatch({
      type: shouldAdd ? 'ADD' : 'REMOVE',
      id,
      functionContent,
    });
  }

  return (
    <TraitsContext.Provider value={traitsData}>
      <TraitsDispatchContext.Provider value={{ handleUpdateTrait }}>{children}</TraitsDispatchContext.Provider>
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
