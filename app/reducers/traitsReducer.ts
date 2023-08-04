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
  switch (type) {
    case 'ADD':
      const addedTraits = [...state.traits, { id, content, name }];
      return {
        traits: addedTraits,
        cache: [...state.cache, addedTraits],
        cacheIndex: state.cacheIndex + 1,
      };
    case 'REMOVE':
      const index = state.traits.findIndex((trait) => trait.id === id);
      const remainingTraits = [...state.traits.slice(0, index), ...state.traits.slice(index + 1)];
      return {
        traits: remainingTraits,
        cache: [...state.cache, remainingTraits],
        cacheIndex: state.cacheIndex + 1,
      };
    case 'REORDER':
      const { traits: newTraits } = action;
      return {
        traits: newTraits!,
        cache: [...state.cache, newTraits!],
        cacheIndex: state.cacheIndex + 1,
      };
    case 'UNDO':
      return {
        ...state,
        traits: state.cache[state.cacheIndex - 1],
        cacheIndex: state.cacheIndex - 1,
      };
    case 'REDO':
      return {
        ...state,
        traits: state.cache[state.cacheIndex + 1],
        cacheIndex: state.cacheIndex + 1,
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
