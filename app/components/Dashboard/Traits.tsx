import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Trait from './Trait';
import TraitSet from './TraitSet';
import DragTrait from './DragTrait';

const traitSectionMapping = [
  {
    description: 'Draw elements on the canvas.',
    type: 'draw',
  },
  {
    description: 'Repeat a trait sequence to create patterns.',
    type: 'repeat',
  },
  {
    description: 'Modify canvas before drawing.',
    type: 'pre-process',
  },
  {
    description: 'Modify canvas after drawing.',
    type: 'post-process',
  },
];

function mapTraitsToSections(traits: any) {
  return traitSectionMapping.map((section) => {
    const sectionTraits = traits.filter((trait: any) => trait.type === section.type);
    return {
      ...section,
      traits: sectionTraits,
    };
  });
}

export default async function Traits() {
  const supabase = createServerComponentClient({ cookies });
  const { data: traits } = await supabase.from('traits').select();

  const parsedTraits = mapTraitsToSections(traits);

  return (
    <>
      {/* <code>
        <pre>{JSON.stringify(parsedTraits, null, 2)}</pre>
      </code> */}
      {parsedTraits?.map(({ description, type, traits }) => (
        <TraitSet key={type} title={type.toUpperCase()} info={description}>
          {/* @ts-ignore-next-line */}
          {traits.map(({ id, name }) => (
            <DragTrait key={id} name={name} />
          ))}
        </TraitSet>
      ))}
    </>
  );
}
