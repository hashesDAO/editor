'use client';

import { createContext, useContext, useReducer } from 'react';
import { Trait, initialTraitsState, traitsReducer } from '../reducers/traitsReducer';

type DispatchFns = {
  handleAddTrait: (id: string, content: string, name: string) => void;
  handleRemoveTrait: (id: string) => void;
  handleReorderedTraits: (traits: Trait[]) => void;
  handleUndo: () => void;
  handleRedo: () => void;
};

const Context = createContext<Trait[] | undefined>(undefined);
const DispatchContext = createContext<DispatchFns | undefined>(undefined);

export function TraitsContextProvider({ children }: { children: React.ReactNode }) {
  const [traitsData, dispatch] = useReducer(traitsReducer, initialTraitsState);

  function handleAddTrait(id: string, content: string, name: string) {
    const numTraits = traitsData.traits.filter((trait) => trait.name === name).length;
    dispatch({
      type: 'ADD',
      id: `${id}-${numTraits + 1}`,
      content: content.replace(/\s+/g, ' '),
      name,
    });
  }

  function handleRemoveTrait(id: string) {
    if (!traitsData.traits.find((trait) => trait.id === id)) {
      return null;
    }

    dispatch({
      type: 'REMOVE',
      id,
      content: '',
      name: '',
    });
  }

  function isSameTraitList(traits: Trait[]) {
    return (
      traitsData.traits.length === traits.length &&
      traitsData.traits.every((trait, index) => trait.id === traits[index].id)
    );
  }

  function handleReorderedTraits(traits: Trait[]) {
    if (isSameTraitList(traits)) {
      return null;
    }

    //TODO: fix this (bad typing)
    dispatch({
      type: 'REORDER',
      id: '',
      content: '',
      name: '',
      traits,
    });
  }

  function handleUndo() {
    if (traitsData.cacheIndex === 0) {
      return null;
    }

    dispatch({
      type: 'UNDO',
      id: '',
      content: '',
      name: '',
    });
  }

  function handleRedo() {
    if (traitsData.cacheIndex === traitsData.cache.length - 1) {
      return null;
    }

    dispatch({
      type: 'REDO',
      id: '',
      content: '',
      name: '',
    });
  }

  return (
    <Context.Provider value={traitsData.traits}>
      <DispatchContext.Provider
        value={{ handleAddTrait, handleRemoveTrait, handleReorderedTraits, handleUndo, handleRedo }}
      >
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
