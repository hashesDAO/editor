'use client';

import { useContainerDimensions } from '@/app/hooks/useContainerDimensions';
import { ParsedTrait, TraitObject } from '@/app/util/types';
import { useRef, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import DragTrait from './DragTrait';
import TraitSet from './TraitSet';
import { Drag } from './buttons/Drag';
import { useTraitsContext } from '@/app/contexts/TraitsContext';

function TraitList({ type, traits }: { type: string; traits: TraitObject[] }) {
  const componentRef = useRef<HTMLDivElement>(null);
  const { width: dynamicWidth } = useContainerDimensions(componentRef);
  return (
    <div ref={componentRef}>
      <Droppable droppableId={type}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {traits.map(({ id, name, content }, index: number) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      width: dynamicWidth,
                    }}
                  >
                    <DragTrait
                      key={id}
                      name={name}
                      value={{ id, content }}
                      dragIcon={<Drag ref={provided.innerRef} {...provided.dragHandleProps} />}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

function reorderList(list: TraitObject[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function DraggableTraitList({ traits }: { traits: ParsedTrait[] }) {
  const selectedTraits = useTraitsContext();
  const [dragTraits, setDragTraits] = useState(() => traits);

  function handleDragEnd({ source, destination }: DropResult) {
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-1/2">
        <>
          <code>{JSON.stringify(selectedTraits)}</code>
          {dragTraits.map(({ description, type, traits }) => (
            <TraitSet key={type} title={type.toUpperCase()} info={description}>
              <TraitList type={type} traits={traits} />
            </TraitSet>
          ))}
        </>
      </div>
    </DragDropContext>
  );
}
