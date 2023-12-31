import { TRAITS_TABLE } from '@/app/util/constants';
import type { ParsedTrait, TraitObject } from '@/app/util/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SelectedTraitList from './SelectedTraitList';
import TraitList from './TraitList';

function mapTraitsToSections(traits: TraitObject[]): ParsedTrait[] {
  const traitSectionMapping = [
    {
      description: 'Draw elements on the canvas.',
      type: 'draw' as const,
    },
    {
      description: 'Repeat a trait sequence to create patterns.',
      type: 'repeat' as const,
    },
    {
      description: 'Modify canvas before drawing.',
      type: 'pre-process' as const,
    },
    {
      description: 'Modify canvas after drawing.',
      type: 'post-process' as const,
    },
  ];

  return traitSectionMapping.map((section) => {
    const sectionTraits = traits.filter((trait) => trait.type === section.type);
    return {
      ...section,
      traits: sectionTraits,
    };
  });
}

export default async function Traits() {
  const supabase = createServerComponentClient({ cookies });
  const { data: traits } = await supabase.from(TRAITS_TABLE).select();
  // TODO: handle potential error
  return (
    <>
      <TraitList traits={mapTraitsToSections(traits!)} />
      <SelectedTraitList />
    </>
  );
}
