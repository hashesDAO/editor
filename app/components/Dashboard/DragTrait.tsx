import type { TraitValue } from '@/app/util/types';
import Toggle from './Toggle';
import Trait from './Trait';
import Remove from './buttons/Remove';

type Props = {
  name: string;
  value: TraitValue;
  dragIcon: JSX.Element;
};

export default function DragTrait({ name, value, dragIcon }: Props) {
  return (
    <div className="flex justify-between">
      {dragIcon}
      <div className="px-2 w-full">
        <Trait name={name}>
          {/* <TraitOptions /> */}
          {/* <Toggle value={value} /> */}
        </Trait>
      </div>
      <Remove />
    </div>
  );
}
