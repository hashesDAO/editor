'use client';

import { useTraitsContext, useTraitsDispatch } from '@/app/contexts/TraitsContext';
import { useContainerDimensions } from '@/app/hooks/useContainerDimensions';
import type { Trait } from '@/app/reducers/traitsReducer';
import { useRef } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import DragTrait from './DragTrait';
import TraitSet from './TraitSet';
import { Drag } from './buttons/Drag';

type TraitListProps = {
  traits: Trait[];
};

function TraitList({ traits }: TraitListProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const { width: dynamicWidth } = useContainerDimensions(componentRef);
  return (
    <div ref={componentRef}>
      <Droppable droppableId={'type'}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {traits.map(({ id, content }, index) => (
              <Draggable key={`${id}-${index}`} draggableId={`${id}-${index}`} index={index}>
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

function reorderList(list: Trait[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function SelectedTraitList() {
  const selectedTraits = useTraitsContext();
  const { handleReorderedTraits } = useTraitsDispatch();

  function handleDragEnd({ source, destination }: DropResult) {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const reorderedTraits = reorderList(selectedTraits, source.index, destination.index);
    handleReorderedTraits(reorderedTraits);
  }

  return (
    <section className="w-1/2">
      <TraitSet title="SELECTED TRAITS" info="These are your currently selected traits.">
        <DragDropContext onDragEnd={handleDragEnd}>
          <TraitList traits={selectedTraits} />
        </DragDropContext>
      </TraitSet>
    </section>
  );
}
