import { TRAITS_TABLE, USER_TRAITS_TABLE } from '@/app/util/constants';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split('/').pop();
  const supabase = createServerComponentClient({ cookies });
  const { data: projectData, error } = await supabase.from(USER_TRAITS_TABLE).select('*').eq('slug', slug).single();

  if (error) {
    return NextResponse.json({ error: `error getting project data from DB: ${error.message}` }, { status: 500 });
  }

  const parsedTraitIds = projectData.trait_ids.map((traitId: string) => traitId.split('-')[0]);

  //get traits data associated with project trait ids
  const { data: traitsData, error: traitsError } = await supabase.from(TRAITS_TABLE).select().in('id', parsedTraitIds);

  if (traitsError) {
    return NextResponse.json({ error: `error getting traits data from DB: ${traitsError.message}` }, { status: 500 });
  }

  const parsedTraitsData = [...projectData.trait_ids].map((id) => {
    const { content, name } = traitsData.find((trait) => trait.id === id.split('-')[0]);
    return {
      id,
      content,
      name,
    };
  });

  return NextResponse.json({ title: projectData.title, data: parsedTraitsData }, { status: 200 });
}
