import Trait from './Trait';
import Remove from './buttons/Remove';

type Props = {
  name: string;
  id: string;
  dragIcon: JSX.Element;
};

export default function DragTrait({ name, dragIcon, id }: Props) {
  return (
    <div className="flex justify-between">
      {dragIcon}
      <div className="px-2 w-full">
        <Trait name={name} />
      </div>
      <Remove id={id} />
    </div>
  );
}
