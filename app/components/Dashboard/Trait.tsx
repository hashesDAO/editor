'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import type { TraitValue } from '@/app/util/types';

type Props = React.PropsWithChildren<{
  name: string;
  value?: TraitValue;
}>;

export default function Trait({ name, value, children }: Props) {
  const { handleAddTrait } = useTraitsDispatch();

  function handleClick() {
    if (value) {
      handleAddTrait(value.id, value.content, name);
    }
  }

  return (
    <div
      className="w-full flex justify-between items-center px-5 py-4 bg-traitGray mb-3 rounded-[70px] cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-xs font-medium tracking-wide">{name}</p>
      {children}
    </div>
  );
}
