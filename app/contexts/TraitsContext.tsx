'use client';

import { createContext, useContext, useReducer } from 'react';
import { Trait, traitsReducer } from '../reducers/traitsReducer';

type DispatchFns = {
  handleAddTrait: (id: string, content: string) => void;
  handleRemoveTrait: (id: string) => void;
  handleReorderedTraits: (traits: Trait[]) => void;
};

const Context = createContext<Trait[] | undefined>(undefined);
const DispatchContext = createContext<DispatchFns | undefined>(undefined);

export function TraitsContextProvider({ children }: { children: React.ReactNode }) {
  const [traitsData, dispatch] = useReducer(traitsReducer, []);

  function handleAddTrait(id: string, content: string) {
    dispatch({
      type: 'ADD',
      id,
      content,
    });
  }

  function handleRemoveTrait(id: string) {
    //prevent unnecessary dispatches
    if (!traitsData.find((trait) => trait.id === id)) {
      return null;
    }

    dispatch({
      type: 'REMOVE',
      id,
      content: '',
    });
  }

  function isSameTraitList(traits: Trait[]) {
    return traitsData.length === traits.length && traitsData.every((trait, index) => trait.id === traits[index].id);
  }

  //TODO: fix this (bad typing)
  function handleReorderedTraits(traits: Trait[]) {
    //prevent unnecessary dispatches
    if (isSameTraitList(traits)) {
      return null;
    }

    dispatch({
      type: 'REORDER',
      id: '',
      content: '',
      traits,
    });
  }

  return (
    <Context.Provider value={traitsData}>
      <DispatchContext.Provider value={{ handleAddTrait, handleRemoveTrait, handleReorderedTraits }}>
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
