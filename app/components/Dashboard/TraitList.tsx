'use client';

import { ParsedTrait } from '@/app/util/types';
import DraggableTraitList from './DraggableTraitList';
import Toggle from './Toggle';
import Trait from './Trait';
import TraitSet from './TraitSet';

function isDragTrait(type: string) {
  return type === 'draw' || type === 'repeat';
}

export default function TraitList({ traits }: { traits: ParsedTrait[] }) {
  const draggableTraits = traits.filter(({ type }) => isDragTrait(type));
  const nonDraggableTraits = traits.filter(({ type }) => !isDragTrait(type));
  return (
    <>
      <DraggableTraitList traits={draggableTraits} />
      {nonDraggableTraits.map(({ description, type, traits }) => (
        <TraitSet key={type} title={type.toUpperCase()} info={description}>
          <ul>
            {traits.map(({ id, name, content }) => (
              <li key={id}>
                <Trait name={name}>
                  <Toggle value={{ id, content }} />
                </Trait>
              </li>
            ))}
          </ul>
        </TraitSet>
      ))}
    </>
  );
}
