'use client';

import Trait from './Trait';
import TraitSet from './TraitSet';
import { DragTrait } from './DragTrait';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Toggle from './Toggle';

function isDragTrait(type: string) {
  return type === 'draw' || type === 'repeat';
}

function DraggableTraitList({ type, traits }: { type: string; traits: any[] }) {
  return (
    <Droppable droppableId={type}>
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {traits.map(({ id, name, content }: any, index: number) => (
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

export default function TraitList({ traits }: { traits: any[] }) {
  return (
    <DragDropContext onDragEnd={() => {}}>
      {traits.map(({ description, type, traits }) => (
        <TraitSet key={type} title={type.toUpperCase()} info={description}>
          {isDragTrait(type) ? (
            <DraggableTraitList type={type} traits={traits} />
          ) : (
            <ul>
              {traits.map(({ id, name, content }: any, index: number) => (
                <li key={id}>
                  <Trait name={name}>
                    <Toggle value={{ id, content }} />
                  </Trait>
                </li>
              ))}
            </ul>
          )}
        </TraitSet>
      ))}
    </DragDropContext>
  );
}
