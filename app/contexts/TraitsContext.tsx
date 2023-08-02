'use client';

import { createContext, useContext, useReducer } from 'react';
import { Trait, traitsReducer } from '../reducers/traitsReducer';

type DispatchFns = {
  handleUpdateTrait: (shouldAdd: boolean, id: string, functionContent: string) => void;
};

const Context = createContext<Trait[] | undefined>(undefined);
const DispatchContext = createContext<DispatchFns | undefined>(undefined);

export function TraitsContextProvider({ children }: { children: React.ReactNode }) {
  const [traitsData, dispatch] = useReducer(traitsReducer, []);

  function handleUpdateTrait(id: string, functionContent: string) {
    dispatch({
      type: 'ADD',
      id,
      functionContent,
    });
  }

  return (
    <Context.Provider value={traitsData}>
      <DispatchContext.Provider value={{ handleUpdateTrait }}>{children}</DispatchContext.Provider>
    </Context.Provider>
  );
}

export function useTraitsContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useTraitsContext must be used within a TraitsContextProvider');
  }
  return context;
}

export function useTraitsDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useTraitsDispatch must be used within a TraitsContextProvider');
  }
  return context;
}
