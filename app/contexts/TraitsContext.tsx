'use client';

import { createContext, useContext, useReducer } from 'react';
import { Trait, traitsReducer } from '../reducers/traitsReducer';

type DispatchFns = {
  handleUpdateTrait: (shouldAdd: boolean, id: string, functionContent: string) => void;
  handleReorderedTraits: (traits: Trait[]) => void;
};

const Context = createContext<Trait[] | undefined>(undefined);
const DispatchContext = createContext<DispatchFns | undefined>(undefined);

export function TraitsContextProvider({ children }: { children: React.ReactNode }) {
  const [traitsData, dispatch] = useReducer(traitsReducer, []);

  function handleUpdateTrait(shouldAdd: boolean, id: string, functionContent: string) {
    //prevent unnecessary dispatches
    if (shouldAdd === false && !traitsData.find((trait) => trait.id === id)) {
      return null;
    }

    dispatch({
      type: shouldAdd ? 'ADD' : 'REMOVE',
      id,
      functionContent,
    });
  }

  function handleReorderedTraits(traits: Trait[]) {
    dispatch({
      type: 'REORDER',
      id: '',
      functionContent: '',
      traits,
    });
  }

  return (
    <Context.Provider value={traitsData}>
      <DispatchContext.Provider value={{ handleUpdateTrait, handleReorderedTraits }}>
        {children}
      </DispatchContext.Provider>
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
