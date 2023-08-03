'use client';

// export const initializer = (initialValue = []) => JSON.parse(localStorage.getItem('traits')) || initialValue;

export type Action = {
  type: string;
  id: string;
  content: string;
  traits?: Trait[];
};

export type Trait = {
  id: string;
  content: string;
};

export function traitsReducer(traits: Trait[], action: Action) {
  const { type, id, content } = action;
  switch (type) {
    case 'ADD':
      return [
        {
          id,
          content,
        },
        ...traits,
      ];
    case 'REMOVE':
      const index = traits.findIndex((trait) => trait.id === id);
      return [...traits.slice(0, index), ...traits.slice(index + 1)];
    case 'REORDER':
      const { traits: newTraits } = action;
      return newTraits!;
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
