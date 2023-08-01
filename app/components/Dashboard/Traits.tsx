import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import TraitList from './TraitList';

function mapTraitsToSections(traits: any) {
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
  return <TraitList traits={mapTraitsToSections(traits)} />;
}
