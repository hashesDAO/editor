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
  cache: Trait[];
  cacheIndex: number;
};

export function traitsReducer(state: TraitsState, action: Action) {
  const { type, id, content, name } = action;
  switch (type) {
    case 'ADD':
      const addedTraits = [...state.traits, { id, content, name }];
      return {
        ...state,
        traits: addedTraits,
      };
    case 'REMOVE':
      const index = state.traits.findIndex((trait) => trait.id === id);
      const remainingTraits = [...state.traits.slice(0, index), ...state.traits.slice(index + 1)];
      return {
        ...state,
        traits: remainingTraits,
      };
    case 'REORDER':
      const { traits: newTraits } = action;
      return {
        ...state,
        traits: newTraits!,
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
