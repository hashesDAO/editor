'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import { TraitValue } from '@/app/util/types';

type Props = React.PropsWithChildren<{
  name: string;
  value: TraitValue;
}>;

export default function Trait({ name, value, children }: Props) {
  const { handleUpdateTrait } = useTraitsDispatch();
  return (
    <div
      className="w-full flex justify-between items-center px-5 py-4 bg-traitGray mb-3 rounded-[70px] cursor-pointer"
      onClick={() => handleUpdateTrait(value.id, value.content)}
    >
      <p className="text-xs font-medium tracking-wide">{name}</p>
      {children}
    </div>
  );
}
