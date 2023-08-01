'use client';

import Trait from './Trait';
import TraitSet from './TraitSet';
import { DragTrait } from './DragTrait';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Toggle from './Toggle';
import { ParsedTrait, TraitObject } from '@/app/util/types';
import { useState } from 'react';

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

function reorderList(list: TraitObject[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function TraitList({ traits }: { traits: ParsedTrait[] }) {
  const draggableTraits = traits.filter(({ type }) => isDragTrait(type));
  const nonDraggableTraits = traits.filter(({ type }) => !isDragTrait(type));
  const [dragTraits, setDragTraits] = useState(() => draggableTraits);

  function handleDragEnd(res) {
    const { source, destination } = res;
    // dropped outside the list
    if (!destination) {
      return;
    }

    const traitType = destination.droppableId;
    const traitTypeToUpdate = dragTraits.find(({ type }) => type === traitType)?.traits || [];
    const reorderedTraits = reorderList(traitTypeToUpdate, source.index, destination.index);

    const newDragTraits = dragTraits.map((trait) => {
      if (trait.type === traitType) {
        return {
          ...trait,
          traits: reorderedTraits,
        };
      }
      return trait;
    });

    setDragTraits(newDragTraits);
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {dragTraits.map(({ description, type, traits }) => (
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
