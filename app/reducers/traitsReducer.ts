'use client';

// export const initializer = (initialValue = []) => JSON.parse(localStorage.getItem('traits')) || initialValue;

export type Action = {
  type: string;
  id: string;
  content: string;
  name: string;
  traits?: Trait[];
};

export type Trait = {
  id: string;
  content: string;
  name: string;
};

export type TraitsState = {
  traits: Trait[];
  cache: Trait[][];
  cacheIndex: number;
};

export const initialTraitsState = {
  traits: [],
  cache: [],
  cacheIndex: 0,
};

export function traitsReducer(state: TraitsState, action: Action) {
  const { type, id, content, name } = action;
  const { traits, cache, cacheIndex } = state;
  switch (type) {
    case 'ADD':
      const addedTraits = [...traits, { id, content, name }];
      const newCache = [...cache, addedTraits];
      return {
        traits: addedTraits,
        cache: newCache,
        cacheIndex: newCache.length - 1,
      };
    case 'BULK_ADD':
      const bulkAddedTraits = [...traits, ...action.traits!];
      const newBulkCache = [...cache, bulkAddedTraits];
      return {
        traits: bulkAddedTraits,
        cache: newBulkCache,
        cacheIndex: newBulkCache.length + 1,
      };
    case 'REMOVE':
      const index = traits.findIndex((trait) => trait.id === id);
      const remainingTraits = [...traits.slice(0, index), ...traits.slice(index + 1)];
      return {
        traits: remainingTraits,
        cache: [...cache, remainingTraits],
        cacheIndex: cacheIndex + 1,
      };
    case 'REMOVE_LAST':
      const lastTraitIndex = traits.length - 1;
      const remainingTraitsAfterUndo = [...traits.slice(0, lastTraitIndex), ...traits.slice(lastTraitIndex + 1)];
      return {
        traits: remainingTraitsAfterUndo,
        cache: [...cache, remainingTraitsAfterUndo],
        cacheIndex: cacheIndex + 1,
      };
    case 'REORDER':
      const { traits: newTraits } = action;
      return {
        traits: newTraits!,
        cache: [...cache, newTraits!],
        cacheIndex: cacheIndex + 1,
      };
    case 'UNDO':
      return {
        ...state,
        traits: cache[cacheIndex - 1],
        cacheIndex: cacheIndex - 1,
      };
    case 'REDO':
      return {
        ...state,
        traits: cache[cacheIndex + 1],
        cacheIndex: cacheIndex + 1,
      };
    case 'SHUFFLE':
      const shuffledTraits = [...traits];
      for (let i = shuffledTraits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTraits[i], shuffledTraits[j]] = [shuffledTraits[j], shuffledTraits[i]];
      }
      return {
        traits: shuffledTraits,
        cache: [...cache, shuffledTraits],
        cacheIndex: cacheIndex + 1,
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
