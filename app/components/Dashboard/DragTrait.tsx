import type { TraitValue } from '@/app/util/types';
import Toggle from './Toggle';
import Trait from './Trait';
import Add from './buttons/Add';
import Drag from './buttons/Drag';

type Props = {
  name: string;
  value: TraitValue;
};

export default function DragTrait({ name, value }: Props) {
  return (
    <div className="flex justify-between">
      <Drag />
      <div className="px-2 w-full">
        <Trait name={name}>
          {/* <TraitOptions /> */}
          <Toggle value={value} />
        </Trait>
      </div>
      <Add />
    </div>
  );
}
