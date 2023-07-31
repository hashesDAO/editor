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
      return traits.filter(({ id }) => id !== action.id);
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
