import Trait from './Trait';
import TraitOptions from './TraitOptions';
import Add from './buttons/Add';
import Drag from './buttons/Drag';

export default function DragTrait({ name }: { name: string }) {
  return (
    <div className="flex justify-between">
      <Drag />
      <div className="px-2 w-full">
        <Trait name={name}>
          <TraitOptions name={name} />
        </Trait>
      </div>
      <Add />
    </div>
  );
}
