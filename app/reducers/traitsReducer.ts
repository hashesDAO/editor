'use client';

// export const initializer = (initialValue = []) => JSON.parse(localStorage.getItem('traits')) || initialValue;

type Action = {
  type: string;
  id: string;
  functionContent: string;
};

type Trait = {
  id: string;
  functionContent: string;
};

export default function traitsReducer(traits: Trait[], action: Action) {
  const { type, id, functionContent } = action;
  switch (type) {
    case 'add':
      return [
        {
          id,
          functionContent,
        },
        ...traits,
      ];
    case 'remove':
      return traits.filter(({ id }) => id !== action.id);
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
