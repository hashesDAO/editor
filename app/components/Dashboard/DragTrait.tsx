import type { TraitValue } from '@/app/util/types';
import { forwardRef } from 'react';
import Toggle from './Toggle';
import Trait from './Trait';
import Add from './buttons/Add';
import { Drag } from './buttons/Drag';

type Props = {
  name: string;
  value: TraitValue;
  ref: React.Ref<HTMLDivElement>;
};

export const DragTrait = forwardRef(function DragTrait({ name, value, ref }: Props) {
  return (
    <div className="flex justify-between">
      <Drag ref={ref} />
      <div className="px-2 w-full">
        <Trait name={name}>
          {/* <TraitOptions /> */}
          <Toggle value={value} />
        </Trait>
      </div>
      <Add />
    </div>
  );
});
