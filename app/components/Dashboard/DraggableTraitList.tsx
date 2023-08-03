'use client';

import { useContainerDimensions } from '@/app/hooks/useContainerDimensions';
import { ParsedTrait, TraitObject } from '@/app/util/types';
import { useRef, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import DragTrait from './DragTrait';
import TraitSet from './TraitSet';
import { Drag } from './buttons/Drag';
import { useTraitsContext, useTraitsDispatch } from '@/app/contexts/TraitsContext';
import type { Trait } from '@/app/reducers/traitsReducer';

function TraitList({ traits }: { traits: Trait[] }) {
  const componentRef = useRef<HTMLDivElement>(null);
  const { width: dynamicWidth } = useContainerDimensions(componentRef);
  return (
    <div ref={componentRef}>
      <Droppable droppableId={'type'}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {traits.map(({ id, functionContent }, index) => (
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
                      name={id}
                      value={{ id, functionContent }}
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

function reorderList(list: Trait[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function DraggableTraitList({ traits }: { traits: ParsedTrait[] }) {
  const selectedTraits = useTraitsContext();
  const { handleReorderedTraits } = useTraitsDispatch();
  // const [dragTraits, setDragTraits] = useState(() => traits);

  function handleDragEnd({ source, destination }: DropResult) {
    // dropped outside the list
    if (!destination) {
      return;
    }

    // const traitType = destination.droppableId;
    // const traitTypeToUpdate = dragTraits.find(({ type }) => type === traitType)?.traits || [];
    const reorderedTraits = reorderList(selectedTraits, source.index, destination.index);

    // const newDragTraits = dragTraits.map((trait) => {
    //   if (trait.type === traitType) {
    //     return {
    //       ...trait,
    //       traits: reorderedTraits,
    //     };
    //   }
    //   return trait;
    // });

    // setDragTraits(newDragTraits);
    console.log('reorderedTraits', reorderedTraits);
    handleReorderedTraits(reorderedTraits);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className="w-1/2">
        {/* <code>{JSON.stringify(selectedTraits)}</code> */}
        <TraitSet title="SELECTED TRAITS" info="These are your currently selected traits.">
          {/* {dragTraits.map(({ type, traits }) => (
            <TraitList key={type} type={type} traits={traits} />
          ))} */}

          <TraitList traits={selectedTraits} />
        </TraitSet>
      </section>
    </DragDropContext>
  );
}
