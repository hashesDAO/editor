'use client';

// export const initializer = (initialValue = []) => JSON.parse(localStorage.getItem('traits')) || initialValue;

export type Action = {
  type: string;
  id: string;
  functionContent: string;
};

export type Trait = {
  id: string;
  functionContent: string;
};

export function traitsReducer(traits: Trait[], action: Action) {
  const { type, id, functionContent } = action;
  switch (type) {
    case 'ADD':
      return [
        {
          id,
          functionContent,
        },
        ...traits,
      ];
    case 'REMOVE':
      const index = traits.findIndex((trait) => trait.id === id);
      return [...traits.slice(0, index), ...traits.slice(index + 1)];
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
