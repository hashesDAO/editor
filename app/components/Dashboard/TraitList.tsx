'use client';

import Trait from './Trait';
import TraitSet from './TraitSet';
import { DragTrait } from './DragTrait';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Toggle from './Toggle';
import { ParsedTrait, TraitObject } from '@/app/util/types';

function isDragTrait(type: string) {
  return type === 'draw' || type === 'repeat';
}

function DraggableTraitList({ type, traits }: { type: string; traits: TraitObject[] }) {
  return (
    <Droppable droppableId={type}>
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {traits.map(({ id, name, content }, index: number) => (
            <Draggable key={id} draggableId={id} index={index}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <DragTrait key={id} name={name} value={{ id, content }} />
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default function TraitList({ traits }: { traits: ParsedTrait[] }) {
  const draggableTraits = traits.filter(({ type }) => isDragTrait(type));
  const nonDraggableTraits = traits.filter(({ type }) => !isDragTrait(type));

  return (
    <>
      <DragDropContext onDragEnd={() => {}}>
        {draggableTraits.map(({ description, type, traits }) => (
          <TraitSet key={type} title={type.toUpperCase()} info={description}>
            <DraggableTraitList type={type} traits={traits} />
          </TraitSet>
        ))}
      </DragDropContext>

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
