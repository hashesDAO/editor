import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const traitSectionMapping = [
  {
    description: 'Draw elements on the canvas.',
    type: 'drawing',
  },
  {
    description: 'Repeat a trait sequence to create patterns.',
    type: 'repeat',
  },
  {
    description: 'Modify canvas before drawing (ex: setup the background, adjust stroke, fill).',
    type: 'pre-process',
  },
  {
    description: 'Modify canvas after drawing (ex: apply filters, re-arrange pixels).',
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
      <h1>Traits</h1>
      <code>
        <pre>{JSON.stringify(parsedTraits, null, 2)}</pre>
      </code>
      <ul>
        {traits?.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </>
  );
}
